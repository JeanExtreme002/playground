# Instruções para agentes de IA

Este repositório é uma vitrine de projetos de uma oficina de Git & GitHub. Ele foi feito para
iniciantes, então **prefira sempre a solução mais simples e legível**, mesmo que não seja a mais
"elegante".

## Idioma

Regra que vale para o repositório inteiro:

| O quê                                                          | Idioma           |
| -------------------------------------------------------------- | ---------------- |
| Código: variáveis, funções, componentes, props, comentários      | **inglês**       |
| Nomes de teste (`describe`/`it`)                                 | **inglês**       |
| Texto que aparece na tela, incluindo `aria-label` e `placeholder` | **português**    |
| README, AGENTS.md, template de PR, comentários dos workflows      | **português**    |

Ou seja: `const [count, setCount] = useState(0)` renderizando `<Button>Curtir</Button>`.
Chaves do `meta` (`title`, `author`, …) são código, mas os **valores** são texto de tela.

## Estrutura

```
src/
  projects/            <- cada subpasta aqui é uma página publicada
    index.js           <- registro automático (NÃO precisa editar)
    sample/index.jsx   <- projeto de exemplo, use como modelo
  components/          <- peças compartilhadas do site (Layout, ProjectCard, ErrorBoundary)
  pages/               <- Home, ProjectPage, NotFound
  theme.jsx            <- tema global do MUI (claro/escuro)
  config.js            <- URL do repositório
.github/workflows/     <- deploy no GitHub Pages e verificação de PR
```

## Regras ao criar um projeto novo

1. Crie **uma pasta** em `src/projects/<slug>/` com um arquivo `index.jsx` dentro.
   O `<slug>` vira a URL (`/playground/<slug>`): minúsculas, sem acento, palavras separadas por hífen.
2. O arquivo **deve** ter:
   - `export const meta = { title, author, description, icon, github?, tags? }`
     — `icon` é um **componente de ícone do MUI** já importado (ex.: `icon: PaletteOutlinedIcon`),
     não uma string e não um emoji.
   - `export default function MyProject() { ... }` (nome do componente em inglês)
3. **Não edite** `src/projects/index.js` — a descoberta é automática via `import.meta.glob`.
   Também não mexa em arquivos de outros projetos.
4. Mantenha todo o código do projeto dentro da própria pasta. Precisa de mais arquivos?
   Crie-os ali (`components/Card.jsx`, `data.js`, imagens, etc.) e importe com caminho relativo.
5. Use **JavaScript + JSX** (sem TypeScript) e componentes do **MUI** (`@mui/material`,
   `@mui/icons-material`). Não adicione dependências novas ao `package.json` sem necessidade real.
6. Não renderize `<AppBar>`, `<Container>` nem título da página: o site já envolve o projeto em um
   layout com cabeçalho, container e um cabeçalho com o título e o autor.
7. Use as cores do tema (`color="primary"`, `sx={{ color: 'text.secondary' }}`) em vez de cores fixas,
   para o projeto ficar bonito no modo claro **e** no escuro.
8. Nada de emoji como ícone: use `@mui/icons-material`. Para trechos técnicos (comandos, caminhos,
   números em destaque), aplique a fonte monoespaçada do tema:
   `sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono }}`.
9. Prefira `Card` com borda (padrão do tema) a sombras e gradientes; o visual do site é sóbrio,
   com linhas finas e bastante respiro.
10. Siga a regra de idioma da seção **Idioma** acima.

## Commits e Pull Requests

Mensagens de commit e **títulos de Pull Request** seguem o
[Conventional Commits](https://www.conventionalcommits.org), em inglês ou português:
`tipo: descrição em minúsculas`.

- Publicando um projeto novo: `feat: adiciona projeto de fulano`
- Tipos aceitos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`,
  `chore`, `revert`. Escopo é opcional: `feat(sample): ...`

O workflow `.github/workflows/pr-title.yml` valida o título automaticamente.

## Verificação antes de terminar

```bash
npm test        # Vitest + Testing Library
npm run lint    # ESLint, configurado para ser permissivo
npm run build
```

Se os três passarem, está pronto para commit.

O lint não verifica estilo (aspas, ponto e vírgula, indentação) — só erros que quebrariam a
página, como usar um componente sem importar. Avisos não reprovam. Não adicione regras de
formatação ao `eslint.config.js`.

Testes de projeto são **opcionais**. Se criar um, coloque-o dentro da pasta do projeto
(`src/projects/<slug>/index.test.jsx`) e mantenha-o simples: renderizar, simular um clique,
conferir o texto que apareceu. Use `aria-label` nos `IconButton` para conseguir encontrá-los
por `getByRole('button', { name: ... })`.

Nunca adicione testes que dependam do conteúdo do projeto de outra pessoa.
