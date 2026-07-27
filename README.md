# Playground

Uma vitrine coletiva de projetos web feita na **oficina de Git & GitHub**.

Cada pessoa cria uma pasta, abre um Pull Request e ganha a própria página publicada na internet:

| Pasta                              | Vira a página                                                 |
| ---------------------------------- | ------------------------------------------------------------- |
| `src/projects/sample/`             | https://jeanextreme002.github.io/playground/sample              |
| `src/projects/projeto-de-fulano/`  | https://jeanextreme002.github.io/playground/projeto-de-fulano   |
| `src/projects/projeto-de-beltrano/`| https://jeanextreme002.github.io/playground/projeto-de-beltrano |

A página inicial (https://jeanextreme002.github.io/playground/) lista todos os projetos automaticamente.

---

## Como publicar seu projeto

> Não precisa saber React. Copie a pasta de exemplo, mude o conteúdo e mande o Pull Request.

### 1. Faça um fork e clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/playground.git
cd playground
```

### 2. Crie uma branch para o seu projeto

```bash
git checkout -b projeto-de-fulano
```

### 3. Copie a pasta de exemplo

```bash
cp -r src/projects/sample src/projects/projeto-de-fulano
```

> 💡 O nome da pasta vira o endereço do site. Use apenas letras minúsculas, números e hífens —
> nada de espaços ou acentos.

### 4. Edite o arquivo `src/projects/projeto-de-fulano/index.jsx`

Todo projeto tem duas partes obrigatórias:

```jsx
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined'

// 1) Suas informações — aparecem no card da página inicial
export const meta = {
  title: 'Meu Primeiro Site',
  author: 'Fulano de Tal',
  description: 'Uma página sobre meus filmes favoritos.',
  icon: MovieOutlinedIcon, // escolha em mui.com/material-ui/material-icons
  github: 'fulano', // seu usuário do GitHub (opcional)
  tags: ['cinema', 'lista'], // opcional
}

// 2) O que aparece na tela
export default function MyProject() {
  return <h1>Olá, mundo!</h1>
}
```

> 📝 **Convenção de idioma:** o **código** (nomes de variáveis, funções, componentes e comentários)
> fica em **inglês**; o **texto que aparece na tela** fica em **português**. Assim:
> `const [count, setCount] = useState(0)` mostrando `<Button>Curtir</Button>`.

### 5. Salve, envie e abra o Pull Request

```bash
git add .
git commit -m "feat: adiciona projeto de fulano"
git push origin projeto-de-fulano
```

Depois é só abrir o Pull Request no GitHub. Quando ele for aprovado e entrar na `main`,
o site é publicado **sozinho** em cerca de 1 minuto. ✨

> ⚠️ **O título do Pull Request** segue o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):
> comece com um tipo, dois-pontos e a descrição. Para publicar seu projeto, use
> `feat: adiciona projeto de fulano`.
>
> Uma verificação automática confere isso. Se der ❌, ela mostra o formato certo — clique em
> **Edit** ao lado do título, corrija, e ela roda de novo sozinha. Tipos aceitos: `feat`, `fix`,
> `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

---

## Rodando na sua máquina (opcional)

Precisa do [Node.js 20+](https://nodejs.org) instalado.

```bash
npm install   # só na primeira vez
npm run dev   # abre em http://localhost:5173/playground/
```

O navegador atualiza sozinho a cada arquivo salvo.

---

## Testes

```bash
npm test          # roda uma vez
npm run test:watch # fica rodando enquanto você edita
```

São poucos testes, de propósito ([Vitest](https://vitest.dev) + Testing Library):

- `src/site.test.jsx` — a home lista os projetos, a busca filtra, as rotas abrem.
- `src/projects/projects.test.js` — cada pasta virou uma página válida (nome do endereço em
  minúsculas, `export default` presente, sem endereços repetidos).
- `src/projects/sample/index.test.jsx` — exemplo de teste de um projeto, caso você queira testar o seu.

**Testar o seu projeto é opcional.** E, mesmo que um teste falhe, **o site continua no ar**: os
testes rodam só na verificação do Pull Request (`ci.yml`), nunca no deploy (`deploy.yml`).

---

## Lint

```bash
npm run lint
```

O lint é **de propósito bem permissivo**. Ele não olha estilo: aspas simples ou duplas, ponto e
vírgula, indentação, tamanho de linha — nada disso importa. Escreva do jeito que preferir.

Ele só reprova o que deixaria sua página quebrada:

| Situação                                      | Resultado                       |
| --------------------------------------------- | ------------------------------- |
| Usar um componente que você esqueceu de importar | ❌ erro (a página fica em branco) |
| Digitar errado o nome de uma variável           | ❌ erro (a página quebra ao abrir) |
| Deixar um `import` ou variável sem usar         | ⚠️ aviso — passa normalmente     |
| Código mal formatado, linha gigante, `console.log` | ✅ passa                       |

Avisos (⚠️) nunca reprovam a verificação.

---

## Vibe coding 🤖

Este repositório foi feito para ser construído com ajuda de IA (Claude Code, Cursor, Copilot...).
Um prompt que funciona bem:

> Crie um novo projeto neste repositório em `src/projects/projeto-de-fulano/index.jsx`,
> seguindo o mesmo padrão de `src/projects/sample/index.jsx`.
> Deve ser uma página sobre **[sua ideia aqui]**, usando componentes do MUI.

O arquivo [`AGENTS.md`](AGENTS.md) explica as regras do repositório para a IA — ela lê esse arquivo
sozinha e já sai fazendo do jeito certo.

---

## Como isso funciona por dentro

- **React + [Vite](https://vite.dev)** — a base do site.
- **[MUI](https://mui.com/material-ui/all-components/)** — biblioteca de componentes prontos
  (botões, cards, formulários). Tudo já vem com tema claro e escuro.
- **[React Router](https://reactrouter.com)** — transforma cada pasta em uma URL.
- **`src/projects/index.js`** — encontra as pastas automaticamente com `import.meta.glob`.
  Ninguém precisa editar um arquivo central, então **não dá conflito de merge** entre os PRs.
- **`.github/workflows/deploy.yml`** — a cada push na `main`, o GitHub compila e publica no Pages.
- **`.github/workflows/ci.yml`** — a cada Pull Request, roda os testes, o lint e confere se o site
  compila.
- **`.github/workflows/pr-title.yml`** — confere se o título do Pull Request segue o Conventional
  Commits. O título importa porque, no merge com squash, ele vira a mensagem do commit na `main`.
- **`.github/workflows/delete-branch.yml`** — quando um Pull Request é fechado, apaga a branch dele
  para a lista de branches não crescer sem parar. A `main` e branches de fork nunca são apagadas, e
  dá para restaurar pelo próprio PR ("Restore branch").

### Configuração do GitHub Pages (só o dono do repositório faz, uma vez)

Em **Settings → Pages → Build and deployment**, selecione **Source: GitHub Actions**.

---

## Deu problema?

| Problema                                | O que fazer                                                                                   |
| --------------------------------------- | --------------------------------------------------------------------------------------------- |
| Meu projeto não aparece na lista         | Confira se o arquivo se chama exatamente `index.jsx` e se ele tem `export default function`.    |
| A página fica em branco                  | Abra o console do navegador (F12). O erro costuma ser uma tag HTML não fechada.                 |
| O deploy falhou                          | Veja a aba **Actions** do repositório: o log vermelho aponta a linha do erro.                   |
| Mudei o nome da pasta e o link quebrou   | Normal: o link é o nome da pasta. Use o novo endereço.                                          |
