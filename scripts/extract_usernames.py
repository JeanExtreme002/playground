#!/usr/bin/env python3
#
# Le as respostas exportadas do Google Forms (form.csv) e escreve os usuarios do
# GitHub em people.txt, um por linha — o formato que o ./scripts/invite.sh espera.
#
# Por padrao os usuarios novos sao ACRESCENTADOS ao final de people.txt, sem
# repetir quem ja esta na lista. Use --overwrite para gerar o arquivo do zero.
#
# Uso:
#   python3 scripts/extract_usernames.py                   # form.csv -> people.txt
#   python3 scripts/extract_usernames.py --dry-run         # mostra, nao escreve
#   python3 scripts/extract_usernames.py --overwrite       # refaz people.txt
#   python3 scripts/extract_usernames.py outro.csv -o lista.txt

import argparse
import csv
import re
import sys
import unicodedata

# Regras de nome de usuario do GitHub: letras, numeros e hifens, ate 39 chars.
USERNAME_PATTERN = re.compile(r"^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$")


def normalize_header(header):
    """"Username:" e "Usuário do GitHub" viram "username" e "usuario do github"."""
    text = unicodedata.normalize("NFKD", header or "")
    text = "".join(char for char in text if not unicodedata.combining(char))
    return text.strip().strip(":").strip().lower()


def find_username_column(fieldnames):
    """Acha a coluna do usuario pelo cabecalho; sem ela, usa a ultima coluna."""
    for name in fieldnames:
        header = normalize_header(name)
        if "user" in header or "usuario" in header or "github" in header:
            return name
    return fieldnames[-1] if fieldnames else None


def clean_username(value):
    """"@fulano", "https://github.com/fulano/" -> "fulano". Vazio se invalido."""
    username = (value or "").strip()
    if "github.com/" in username:
        username = username.split("github.com/", 1)[1]
    username = username.lstrip("@").split("/")[0].strip()
    return username if USERNAME_PATTERN.match(username) else ""


def read_usernames(csv_path):
    """Devolve (usuarios validos na ordem do arquivo, valores recusados)."""
    with open(csv_path, newline="", encoding="utf-8-sig") as csv_file:
        reader = csv.DictReader(csv_file)
        column = find_username_column(reader.fieldnames or [])
        if column is None:
            sys.exit(f"✗ {csv_path} esta vazio ou nao tem cabecalho.")
        print(f"Coluna usada: {column}")

        usernames = []
        invalid = []
        for row in reader:
            raw = (row.get(column) or "").strip()
            if not raw:
                continue
            username = clean_username(raw)
            if not username:
                invalid.append(raw)
            elif username.lower() not in {name.lower() for name in usernames}:
                usernames.append(username)
        return usernames, invalid


def read_existing(output_path):
    """Linhas atuais de people.txt (ou lista vazia se o arquivo nao existe)."""
    try:
        with open(output_path, encoding="utf-8") as text_file:
            return [line.strip() for line in text_file if line.strip()]
    except FileNotFoundError:
        return []


def main():
    parser = argparse.ArgumentParser(
        description="Extrai os usuarios do GitHub de um CSV do Google Forms."
    )
    parser.add_argument("csv_path", nargs="?", default="form.csv", help="CSV de entrada")
    parser.add_argument("-o", "--output", default="people.txt", help="arquivo de saida")
    parser.add_argument("--overwrite", action="store_true", help="refaz o arquivo de saida")
    parser.add_argument("--dry-run", action="store_true", help="mostra sem escrever")
    args = parser.parse_args()

    try:
        usernames, invalid = read_usernames(args.csv_path)
    except FileNotFoundError:
        sys.exit(f"✗ Arquivo nao encontrado: {args.csv_path}")

    existing = [] if args.overwrite else read_existing(args.output)
    already = {name.lower() for name in existing}

    new = [name for name in usernames if name.lower() not in already]
    repeated = [name for name in usernames if name.lower() in already]

    for name in new:
        print(f"+ {name}")
    for name in repeated:
        print(f"• {name} — ja estava na lista")
    for raw in invalid:
        print(f"✗ {raw} — nao parece um usuario do GitHub valido")

    print()
    if args.dry_run:
        print(f"Simulacao: {len(new)} seriam adicionados a {args.output}. Nada foi escrito.")
        return

    if not new and not args.overwrite:
        print(f"Nada novo: {args.output} continua com {len(existing)} usuarios.")
        return

    with open(args.output, "w", encoding="utf-8") as text_file:
        for name in existing + new:
            text_file.write(f"{name}\n")

    print(f"{args.output}: {len(new)} adicionados, {len(existing) + len(new)} no total.")
    print("Agora rode: ./scripts/invite.sh --dry-run")


if __name__ == "__main__":
    main()
