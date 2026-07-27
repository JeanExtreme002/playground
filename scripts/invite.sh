#!/usr/bin/env bash
#
# Invites everyone listed in a text file as a repository collaborator, so they
# can push branches without forking.
#
# One GitHub username per line. Blank lines and lines starting with "#" are
# skipped, and handles pasted as "@fulano" or "https://github.com/fulano" are
# accepted too — people fill registration forms in creative ways.
#
# Usage:
#   ./scripts/invite-participantes.sh                  # reads people.txt
#   ./scripts/invite-participantes.sh --dry-run        # shows, sends nothing
#   ./scripts/invite-participantes.sh outra-lista.txt
#
# Environment overrides:
#   REPO=owner/name        target repository (default: JeanExtreme002/playground)
#   PERMISSION=push        access level: pull | triage | push | maintain | admin
#
# Requires the GitHub CLI, authenticated as someone who administers the repo:
#   gh auth login

set -uo pipefail

REPO="${REPO:-JeanExtreme002/playground}"
PERMISSION="${PERMISSION:-push}"
FILE='people.txt'
DRY_RUN=false

usage() {
  sed -n '3,20p' "$0" | sed 's|^# \{0,1\}||'
}

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    -h | --help)
      usage
      exit 0
      ;;
    -*)
      echo "Opcao desconhecida: $arg" >&2
      usage >&2
      exit 2
      ;;
    *) FILE="$arg" ;;
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

if [ ! -f "$FILE" ]; then
  echo "✗ Arquivo nao encontrado: $FILE" >&2
  echo "  Crie um arquivo com um usuario do GitHub por linha." >&2
  exit 1
fi

if ! gh api "repos/$REPO" --silent 2>/dev/null; then
  echo "✗ Repositorio inacessivel: $REPO" >&2
  exit 1
fi

# Fetched once so we do not e-mail someone who already has a pending invite.
PENDING=$(gh api "repos/$REPO/invitations" --paginate --jq '.[].invitee.login' 2>/dev/null | tr '[:upper:]' '[:lower:]')

echo "Repositorio: $REPO"
echo "Permissao:   $PERMISSION"
echo "Lista:       $FILE"
$DRY_RUN && echo "Modo:        SIMULACAO (nenhum convite sera enviado)"
echo

convidados=0
ja_dentro=0
ja_convidados=0
falhas=0

# ── Uma pessoa por linha ─────────────────────────────────────────────────────
while IFS= read -r linha || [ -n "$linha" ]; do
  # Trims the ends only (an inner space must stay, so the line is reported as
  # invalid instead of being silently glued into a different username) and
  # drops the \r that shows up when the list comes from Windows or a spreadsheet.
  usuario=$(printf '%s' "$linha" | tr -d '\r' | sed 's/^[[:space:]]*//; s/[[:space:]]*$//')

  [ -z "$usuario" ] && continue
  case "$usuario" in \#*) continue ;; esac

  # "https://github.com/fulano/" / "@fulano" -> "fulano"
  usuario=${usuario##*github.com/}
  usuario=${usuario#@}
  usuario=${usuario%%/*}

  if ! [[ "$usuario" =~ ^[A-Za-z0-9]([A-Za-z0-9-]{0,37}[A-Za-z0-9])?$ ]]; then
    echo "✗ $linha — nao parece um usuario do GitHub valido"
    falhas=$((falhas + 1))
    continue
  fi

  if ! gh api "users/$usuario" --silent 2>/dev/null; then
    echo "✗ $usuario — usuario nao existe no GitHub (erro de digitacao?)"
    falhas=$((falhas + 1))
    continue
  fi

  # 204 = ja e colaborador; 404 = nao e.
  if gh api "repos/$REPO/collaborators/$usuario" --silent 2>/dev/null; then
    echo "• $usuario — ja e colaborador, nada a fazer"
    ja_dentro=$((ja_dentro + 1))
    continue
  fi

  if printf '%s\n' "$PENDING" | grep -qxF "$(printf '%s' "$usuario" | tr '[:upper:]' '[:lower:]')"; then
    echo "• $usuario — convite ja pendente, aguardando a pessoa aceitar"
    ja_convidados=$((ja_convidados + 1))
    continue
  fi

  if $DRY_RUN; then
    echo "→ $usuario — seria convidado ($PERMISSION)"
    convidados=$((convidados + 1))
    continue
  fi

  if gh api -X PUT "repos/$REPO/collaborators/$usuario" -f permission="$PERMISSION" --silent 2>/dev/null; then
    echo "✓ $usuario — convite enviado"
    convidados=$((convidados + 1))
  else
    echo "✗ $usuario — falha ao convidar (permissao insuficiente no repositorio?)"
    falhas=$((falhas + 1))
  fi
done <"$FILE"

# ── Resumo ───────────────────────────────────────────────────────────────────
echo
if $DRY_RUN; then
  echo "Simulacao: $convidados seriam convidados, $ja_dentro ja dentro, $ja_convidados pendentes, $falhas com problema."
  echo "Rode sem --dry-run para enviar de verdade."
else
  echo "Convites enviados: $convidados | ja colaboravam: $ja_dentro | ja pendentes: $ja_convidados | problemas: $falhas"
  [ "$convidados" -gt 0 ] && echo "Peca para aceitarem em: https://github.com/$REPO/invitations (o convite expira em 7 dias)."
fi

[ "$falhas" -eq 0 ]
