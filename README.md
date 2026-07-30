# Playground

O **mural de conquistas** da oficina de Git & GitHub.

O desafio é simples de descrever e não tem nada a ver com programar: **coloque seu nome no mural**.
Para isso você vai clonar o repositório, criar uma branch, mudar um arquivo, abrir um Pull Request e
levá-lo até a `main`. Quando o merge acontecer, seu nome aparece com um troféu em

**https://jeanextreme002.github.io/playground/**

Cada pessoa tem o **seu próprio arquivo** dentro de [`src/participants/`](src/participants) — é só
isso que o seu Pull Request precisa criar.

---

## Como entrar no mural

> Não precisa saber programar. Você vai criar **um arquivo**, e a IA pode escrever ele para você.

### 1. Clone o repositório

Você foi convidado como colaborador, então não precisa de fork:

```bash
git clone https://github.com/JeanExtreme002/playground.git
cd playground
```

### 2. Crie uma branch

A branch é um "galho" separado: você mexe nele sem alterar o site que está no ar.

```bash
git checkout -b nome-de-fulano
```

### 3. Crie o seu arquivo em `src/participants/`

Copie o arquivo de exemplo, dando a ele o nome do seu usuário do GitHub:

```bash
cp src/participants/claude.js src/participants/maria-silva.js
```

Agora abra o seu arquivo e troque os dados pelos seus:

```js
export const participant = {
  name: 'Maria Silva',
  github: 'maria-silva', // seu usuário do GitHub, sem o "@" (opcional)
  message: 'Meu primeiro Pull Request!', // recadinho de uma linha (opcional)
}
```

| Campo     | Obrigatório? | O que é                                                    |
| --------- | ------------ | ---------------------------------------------------------- |
| `name`    | sim          | Seu nome, do jeito que você quer que apareça no site        |
| `github`  | não          | Seu usuário do GitHub, só o nome: `maria-silva`             |
| `message` | não          | Uma frase curta (até 120 caracteres)                        |

> 💡 **Por que um arquivo por pessoa?** Porque assim ninguém escreve na mesma linha que ninguém: o
> site encontra os arquivos da pasta sozinho (`src/participants/index.js`), e todos os Pull Requests
> entram sem se atropelar. Você não precisa editar nenhum arquivo central.

Prompt que funciona bem com o Claude Code (ou Cursor, Copilot...):

> Me adicione ao mural criando meu arquivo em `src/participants/`: nome **Maria Silva**, GitHub
> **maria-silva**, recado **"Meu primeiro Pull Request!"**.

### 4. Salve, envie e abra o Pull Request

```bash
git add .
git commit -m "feat: adiciona maria silva ao mural"
git push origin nome-de-fulano
```

Depois é só abrir o Pull Request no GitHub e pedir o merge. Quando ele entrar na `main`, o site é
publicado **sozinho** em cerca de 1 minuto. ✨

> ⚠️ **O título do Pull Request** segue o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):
> comece com um tipo, dois-pontos e a descrição. Para entrar no mural, use
> `feat: adiciona maria silva ao mural`.
>
> Uma verificação automática confere isso. Se der ❌, ela mostra o formato certo — clique em
> **Edit** ao lado do título, corrija, e ela roda de novo sozinha. Tipos aceitos: `feat`, `fix`,
> `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

---

## Rodando na sua máquina (opcional)

Se quiser ver seu nome no mural antes de abrir o Pull Request. Precisa do
[Node.js 20+](https://nodejs.org) instalado.

```bash
npm install   # só na primeira vez
npm run dev   # abre em http://localhost:5173/playground/
```

O navegador atualiza sozinho a cada arquivo salvo.

---

## Testes

```bash
npm test           # roda uma vez
npm run test:watch # fica rodando enquanto você edita
```

São poucos testes, de propósito ([Vitest](https://vitest.dev) + Testing Library):

- `src/participants.test.js` — cada arquivo de `src/participants/` está preenchido certo (tem `name`,
  o `github` é um usuário válido, o recado é curto, ninguém aparece duas vezes).
- `src/site.test.jsx` — a home mostra todos os nomes, a busca filtra, o link do GitHub aponta para o
  perfil certo.

Eles rodam na verificação do Pull Request (`ci.yml`) e servem para pegar um erro de digitação antes
do merge. Se um teste falhar, a mensagem diz o que corrigir — e o site que já está no ar continua
intacto, porque os testes nunca rodam no deploy (`deploy.yml`).

---

## Lint

```bash
npm run lint
```

O lint é **de propósito bem permissivo**. Ele não olha estilo: aspas simples ou duplas, ponto e
vírgula, indentação, tamanho de linha — nada disso importa.

Ele só reprova o que deixaria a página quebrada, como uma chave ou vírgula esquecida no seu arquivo
ou um componente usado sem `import`.

---

## Como isso funciona por dentro

- **React + [Vite](https://vite.dev)** — a base do site.
- **[MUI](https://mui.com/material-ui/all-components/)** — biblioteca de componentes prontos. Já vem
  com tema claro e escuro.
- **`src/participants/`** — um arquivo por pessoa. É a pasta onde os participantes criam o seu.
- **`src/participants/index.js`** — encontra esses arquivos automaticamente com `import.meta.glob` e
  ordena por nome. Ninguém precisa editar um arquivo central, então **não dá conflito de merge**
  entre os Pull Requests.
- **`src/components/ParticipantRow.jsx`** — uma linha do mural: troféu, nome, recado e `@usuario`.
- **`src/pages/Home.jsx`** — a página única: apresentação, os três passos e o mural.
- **`.github/workflows/deploy.yml`** — a cada push na `main`, o GitHub compila e publica no Pages.
- **`.github/workflows/ci.yml`** — a cada Pull Request, roda os testes, o lint e confere se o site
  compila.
- **`.github/workflows/pr-title.yml`** — confere se o título do Pull Request segue o Conventional
  Commits. O título importa porque, no merge com squash, ele vira a mensagem do commit na `main`.
- **`.github/workflows/delete-branch.yml`** — quando um Pull Request é fechado, apaga a branch dele
  para a lista de branches não crescer sem parar. A `main` e branches de fork nunca são apagadas, e
  dá para restaurar pelo próprio PR ("Restore branch").

### Scripts da organização da oficina

Só quem administra o repositório usa (veja `scripts/how-to-run.txt`):

- `scripts/extract_usernames.py` — tira os usuários do GitHub do CSV de inscrição (`form.csv`) e
  escreve em `people.txt`.
- `scripts/invite.sh` — convida todos do `people.txt` como colaboradores, para poderem enviar
  branches sem fork.

### Configuração do GitHub Pages (só o dono do repositório faz, uma vez)

Em **Settings → Pages → Build and deployment**, selecione **Source: GitHub Actions**.

---

## Deu problema?

| Problema                                     | O que fazer                                                                                        |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Meu nome não apareceu no site                 | Confira se o Pull Request já foi mergeado e espere ~1 minuto. Depois recarregue com `Ctrl+Shift+R`.  |
| Meu nome não aparece nem rodando local        | Confira se o arquivo está em `src/participants/`, termina em `.js` e tem `export const participant`. |
| A verificação do PR falhou (❌)                | Abra a aba **Checks** do Pull Request: a mensagem aponta a linha e o que corrigir (costuma ser uma vírgula). |
| O título do PR foi reprovado                  | Use o formato `feat: adiciona seu nome ao mural`.                                                   |
| A página fica em branco                       | Provavelmente falta uma chave ou uma vírgula no seu arquivo. Rode `npm run lint`.                    |
