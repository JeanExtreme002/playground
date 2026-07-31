#!/usr/bin/env bash
#
# Downloads the Google Sheets tab with the workshop registrations as form.csv,
# the file that scripts/extract_usernames.py reads.
#
# The sheet must be shared as "anyone with the link can view" — this uses the
# public CSV export endpoint, with no login. If it is restricted, Google answers
# with an HTML sign-in page instead of a CSV, and the script says so.
#
# Usage:
#   ./scripts/download-form.sh                     # form.csv (planilha padrao)
#   ./scripts/download-form.sh --dry-run           # mostra a URL, nao baixa
#   ./scripts/download-form.sh -o outro.csv
#   ./scripts/download-form.sh 'https://docs.google.com/spreadsheets/d/.../edit#gid=0'
#
# Environment overrides:
#   SHEET_ID=...           id da planilha
#   SHEET_GID=...          id da aba (o gid da URL)

set -uo pipefail

SHEET_ID="${SHEET_ID:-1FIg_lmWJltp2GGNMuXuPo-b1f9DthoX-Nd2dQO70bTg}"
SHEET_GID="${SHEET_GID:-1809418756}"
OUTPUT='form.csv'
DRY_RUN=false

usage() {
  sed -n '3,18p' "$0" | sed 's|^# \{0,1\}||'
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --dry-run) DRY_RUN=true ;;
    -o | --output)
      shift
      [ "$#" -gt 0 ] || {
        echo "✗ Falta o nome do arquivo depois de -o" >&2
        exit 2
      }
      OUTPUT="$1"
      ;;
    -h | --help)
      usage
      exit 0
      ;;
    -*)
      echo "Opcao desconhecida: $1" >&2
      usage >&2
      exit 2
      ;;
    *)
      # A URL colada da planilha: tira o id de /d/<id>/ e o gid de #gid=<n>.
      url="$1"
      id=$(printf '%s' "$url" | sed -n 's|.*/spreadsheets/d/\([^/?#]*\).*|\1|p')
      if [ -z "$id" ]; then
        echo "✗ Nao consegui achar o id da planilha em: $url" >&2
        echo "  Use a URL completa, no formato https://docs.google.com/spreadsheets/d/<id>/edit" >&2
        exit 2
      fi
      SHEET_ID="$id"
      gid=$(printf '%s' "$url" | sed -n 's|.*[?#&]gid=\([0-9]*\).*|\1|p')
      [ -n "$gid" ] && SHEET_GID="$gid"
      ;;
  esac
  shift
done

if ! command -v curl >/dev/null 2>&1; then
  echo "✗ O curl nao esta instalado." >&2
  exit 1
fi

URL="https://docs.google.com/spreadsheets/d/$SHEET_ID/export?format=csv&gid=$SHEET_GID"

echo "Planilha: $SHEET_ID (aba $SHEET_GID)"
echo "Saida:    $OUTPUT"
echo "URL:      $URL"
echo

if $DRY_RUN; then
  echo "Simulacao: nada foi baixado nem escrito."
  exit 0
fi

# Baixa para um temporario: se der errado, o form.csv atual continua intacto.
TEMP=$(mktemp "${TMPDIR:-/tmp}/form.XXXXXX.csv") || exit 1
trap 'rm -f "$TEMP"' EXIT

STATUS=$(curl -sSL -w '%{http_code}' -o "$TEMP" "$URL") || {
  echo "✗ Falha ao baixar (sem internet?)." >&2
  exit 1
}

if [ "$STATUS" = "404" ]; then
  echo "✗ Planilha nao encontrada (HTTP 404). Confira o id: $SHEET_ID" >&2
  exit 1
fi

# Sem login, uma planilha restrita responde 401/403 com a pagina de acesso em
# HTML — ou, em alguns casos, 200 com a mesma pagina. Os dois casos caem aqui.
if [ "$STATUS" = "401" ] || [ "$STATUS" = "403" ] || head -c 512 "$TEMP" | grep -qi '<html'; then
  echo "✗ A planilha nao esta publica: o Google pediu login (HTTP $STATUS) em vez de mandar o CSV." >&2
  echo "  Abra a planilha, clique em Compartilhar e deixe 'Qualquer pessoa com o link'" >&2
  echo "  como Leitor. Depois rode este script de novo." >&2
  exit 1
fi

if [ "$STATUS" != "200" ]; then
  echo "✗ O Google respondeu HTTP $STATUS." >&2
  echo "  Confira se o id e o gid da planilha estao certos." >&2
  exit 1
fi

if [ ! -s "$TEMP" ]; then
  echo "✗ O download veio vazio — a aba $SHEET_GID tem alguma resposta?" >&2
  exit 1
fi

mv "$TEMP" "$OUTPUT"
trap - EXIT

# awk em vez de "wc -l": a ultima linha do CSV vem sem \n no fim, e o wc nao a conta.
linhas=$(awk 'END { print NR }' "$OUTPUT")
echo "✓ $OUTPUT salvo — $((linhas - 1)) respostas (fora o cabecalho)."
echo "Agora rode: python3 scripts/extract_usernames.py --dry-run"
