#!/usr/bin/env bash
#
# Approves the workshop Pull Requests that are ready, so 200 people do not sit
# waiting for a human to click "Approve". A Pull Request is approved only when
# ALL of these are true:
#
#   1. you were requested as a reviewer;
#   2. every check on the Pull Request passed;
#   3. it has no conflict with the main branch;
#   4. it only adds files inside src/participants/ (relax it with --allow-any-file).
#
# The script NEVER merges anything. Clicking "Merge pull request" is the part
# the participant has to learn, so that stays with them.
#
# Anything that does not fit the rules above is only reported, never touched:
# the Pull Request stays open for you to look at.
#
# Usage:
#   ./scripts/approve-prs.sh                    # approves what is ready, once
#   ./scripts/approve-prs.sh --dry-run          # shows, approves nothing
#   ./scripts/approve-prs.sh --watch            # keeps checking during the workshop
#   ./scripts/approve-prs.sh --allow-any-file   # skips the src/participants/ rule
#
# Environment overrides:
#   REPO=owner/name    target repository (default: JeanExtreme002/playground)
#   REVIEWER=login     reviewer to look for (default: the authenticated user)
#   INTERVAL=60        seconds between rounds when using --watch
#
# Requires the GitHub CLI, authenticated as someone who can review the repo:
#   gh auth login

set -uo pipefail

REPO="${REPO:-JeanExtreme002/playground}"
INTERVAL="${INTERVAL:-60}"
DRY_RUN=false
WATCH=false
ALLOW_ANY_FILE=false

usage() {
  sed -n '3,30p' "$0" | sed 's|^# \{0,1\}||'
}

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --watch) WATCH=true ;;
    --allow-any-file) ALLOW_ANY_FILE=true ;;
    -h | --help)
      usage
      exit 0
      ;;
    *)
      echo "Opcao desconhecida: $arg" >&2
      usage >&2
      exit 2
      ;;
  esac
done

# ── Checagens iniciais ───────────────────────────────────────────────────────
if ! command -v gh >/dev/null 2>&1; then
  echo "✗ O GitHub CLI (gh) nao esta instalado: https://cli.github.com" >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "✗ Voce nao esta autenticado. Rode: gh auth login" >&2
  exit 1
fi

if ! gh api "repos/$REPO" --silent 2>/dev/null; then
  echo "✗ Repositorio inacessivel: $REPO" >&2
  exit 1
fi

# Sem REVIEWER definido, "me colocou como reviewer" quer dizer quem esta logado.
REVIEWER="${REVIEWER:-$(gh api user --jq .login 2>/dev/null)}"
if [ -z "$REVIEWER" ]; then
  echo "✗ Nao consegui descobrir seu usuario. Defina REVIEWER=seu-usuario." >&2
  exit 1
fi

echo "Repositorio: $REPO"
echo "Reviewer:    $REVIEWER"
$ALLOW_ANY_FILE && echo "Escopo:      qualquer arquivo (--allow-any-file)"
$ALLOW_ANY_FILE || echo "Escopo:      apenas arquivos novos em src/participants/"
$DRY_RUN && echo "Modo:        SIMULACAO (nenhum PR sera aprovado)"
$WATCH && echo "Modo:        ACOMPANHANDO, uma rodada a cada ${INTERVAL}s (Ctrl+C para sair)"
echo

# ── Uma linha por Pull Request aberto ────────────────────────────────────────
# Tudo em uma chamada so, para nao estourar o limite de requisicoes com 200 PRs.
# O `--jq` usa o jq embutido no proprio gh, entao nao precisa instalar nada.
listar_prs() {
  gh pr list --repo "$REPO" --state open --limit 300 \
    --json number,author,isDraft,mergeable,reviewDecision,reviewRequests,statusCheckRollup,files \
    --jq '
      # Um check pode vir como CheckRun (tem conclusion) ou como StatusContext
      # (tem state). Esta funcao devolve uma palavra so para os dois casos.
      def situacao:
        if (.conclusion // "") != "" then (.conclusion | ascii_upcase)
        elif (.state // "") != "" then (.state | ascii_upcase)
        else "PENDING" end;
      def rodando: ["PENDING", "EXPECTED", "QUEUED", "IN_PROGRESS", "WAITING", "REQUESTED"];
      def passou: ["SUCCESS", "NEUTRAL", "SKIPPED"];
      .[] | [
        .number,
        (.author.login // "?"),
        (if .isDraft then "rascunho" else "-" end),
        (.mergeable // "UNKNOWN"),
        (.reviewDecision // "NONE"),
        ((.reviewRequests // []) | map(.login // .name // "") | join(",")),
        ((.statusCheckRollup // []) | length),
        ((.statusCheckRollup // []) | map(select(situacao | IN(rodando[]))) | length),
        ((.statusCheckRollup // []) | map(select(situacao | IN(passou[], rodando[]) | not)) | length),
        ((.files // []) | map(.path) | join(","))
      ] | @tsv'
}

# "maria,jean" contem "Jean"? (a comparacao ignora maiusculas e minusculas)
contem_reviewer() {
  local lista alvo
  lista=",$(printf '%s' "$1" | tr '[:upper:]' '[:lower:]'),"
  alvo=",$(printf '%s' "$REVIEWER" | tr '[:upper:]' '[:lower:]'),"
  case "$lista" in *"$alvo"*) return 0 ;; esac
  return 1
}

# Todo arquivo do PR precisa ser um arquivo de participante — e nunca o index.js,
# que e o registro compartilhado.
so_mexeu_em_participantes() {
  local arquivos="$1" arquivo
  [ -z "$arquivos" ] && return 1

  local IFS=','
  for arquivo in $arquivos; do
    case "$arquivo" in
      src/participants/index.js) return 1 ;;
      src/participants/*.js) ;;
      *) return 1 ;;
    esac
  done
  return 0
}

rodada() {
  local aprovados=0 aguardando=0 fora_das_regras=0 falhas=0
  local numero autor rascunho mergeavel decisao solicitados
  local checks_total checks_rodando checks_falhando arquivos

  while IFS=$'\t' read -r numero autor rascunho mergeavel decisao solicitados \
    checks_total checks_rodando checks_falhando arquivos; do
    [ -z "$numero" ] && continue

    local pr="#$numero ($autor)"

    # ── Criterio 1: fui colocado como reviewer? ──────────────────────────────
    if [ "$decisao" = "APPROVED" ]; then
      echo "• $pr — ja aprovado, nada a fazer"
      fora_das_regras=$((fora_das_regras + 1))
      continue
    fi

    if ! contem_reviewer "$solicitados"; then
      echo "• $pr — nao pediu review para $REVIEWER"
      fora_das_regras=$((fora_das_regras + 1))
      continue
    fi

    if [ "$rascunho" = "rascunho" ]; then
      echo "• $pr — ainda e um rascunho (draft)"
      aguardando=$((aguardando + 1))
      continue
    fi

    if [ "$(printf '%s' "$autor" | tr '[:upper:]' '[:lower:]')" = \
      "$(printf '%s' "$REVIEWER" | tr '[:upper:]' '[:lower:]')" ]; then
      echo "• $pr — e um PR seu, e o GitHub nao deixa aprovar o proprio PR"
      fora_das_regras=$((fora_das_regras + 1))
      continue
    fi

    # ── Criterio 2: os checks passaram? ──────────────────────────────────────
    if [ "$checks_total" -eq 0 ]; then
      echo "• $pr — nenhuma verificacao comecou ainda"
      aguardando=$((aguardando + 1))
      continue
    fi

    if [ "$checks_rodando" -gt 0 ]; then
      echo "• $pr — $checks_rodando de $checks_total verificacoes ainda rodando"
      aguardando=$((aguardando + 1))
      continue
    fi

    if [ "$checks_falhando" -gt 0 ]; then
      echo "✗ $pr — $checks_falhando de $checks_total verificacoes falhando"
      fora_das_regras=$((fora_das_regras + 1))
      continue
    fi

    # ── Criterio 3: da merge limpo na main? ──────────────────────────────────
    case "$mergeavel" in
      MERGEABLE) ;;
      CONFLICTING)
        echo "✗ $pr — tem conflito com a main, precisa da pessoa resolver"
        fora_das_regras=$((fora_das_regras + 1))
        continue
        ;;
      *)
        # O GitHub calcula isso sob demanda: na proxima rodada costuma vir pronto.
        echo "• $pr — o GitHub ainda esta calculando se da merge limpo"
        aguardando=$((aguardando + 1))
        continue
        ;;
    esac

    # ── Criterio 4: mexeu so no proprio arquivo? ─────────────────────────────
    if ! $ALLOW_ANY_FILE && ! so_mexeu_em_participantes "$arquivos"; then
      echo "• $pr — mexe em algo fora de src/participants/, revise na mao: $arquivos"
      fora_das_regras=$((fora_das_regras + 1))
      continue
    fi

    if $DRY_RUN; then
      echo "→ $pr — seria aprovado"
      aprovados=$((aprovados + 1))
      continue
    fi

    if gh pr review "$numero" --repo "$REPO" --approve --body \
      "Aprovado automaticamente: as verificacoes passaram e nao ha conflito com a main. Agora e com voce — clique em **Merge pull request** para o seu nome subir para o mural. 🏆" \
      >/dev/null 2>&1; then
      echo "✓ $pr — aprovado"
      aprovados=$((aprovados + 1))
    else
      echo "✗ $pr — falha ao aprovar (permissao insuficiente no repositorio?)"
      falhas=$((falhas + 1))
    fi
  done < <(listar_prs)

  # ── Resumo ─────────────────────────────────────────────────────────────────
  echo
  if $DRY_RUN; then
    echo "Simulacao: $aprovados seriam aprovados | $aguardando aguardando | $fora_das_regras fora das regras"
    echo "Rode sem --dry-run para aprovar de verdade."
  else
    echo "Aprovados: $aprovados | aguardando: $aguardando | fora das regras: $fora_das_regras | problemas: $falhas"
  fi

  [ "$falhas" -eq 0 ]
}

if ! $WATCH; then
  rodada
  exit $?
fi

while true; do
  rodada
  echo
  echo "── proxima rodada em ${INTERVAL}s ──"
  echo
  sleep "$INTERVAL"
done
