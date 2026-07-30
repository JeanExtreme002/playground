# Instruções para agentes de IA

Este repositório é o **mural de conquistas** de uma oficina de Git & GitHub. O site é uma página só,
que lista as pessoas que abriram um Pull Request e conseguiram fazer o merge.

Os participantes pedem isso com palavras diferentes — "me coloca no mural", "quero meu nome no site",
"adiciona a Maria aí", "sou da oficina, me cadastra" —, mas a intenção é a mesma e a solução também:
criar **um arquivo novo** em `src/participants/`. Se o pedido tiver esse espírito, é isso que ele
quer, mesmo sem falar em "mural" nem citar nenhum arquivo. Não crie páginas, rotas nem projetos —
isso não existe mais por aqui.

Como o público é iniciante, **prefira sempre a solução mais simples e legível**, mesmo que não seja a
mais "elegante".

## Adicionando alguém ao mural

1. Crie **um arquivo** em `src/participants/<usuario-do-github>.js`, em minúsculas, sem acento e com
   as palavras separadas por hífen — o usuário `MariaSilva` viraria `mariasilva.js`. Se a pessoa
   não passou o usuário do GitHub, use o nome dela: `maria-silva.js`.

   ```js
   export const participant = {
     name: 'Maria Silva',
     github: 'maria-silva',
     message: 'Meu primeiro Pull Request!',
   }
   ```

2. `name` é obrigatório. `github` (só o usuário, sem `@` e sem URL) e `message` (uma linha, até 120
   caracteres) são opcionais — não invente valores que a pessoa não passou.
3. **Não edite** `src/participants/index.js`: a descoberta é automática via `import.meta.glob`, e a
   ordenação por nome também. É isso que faz os Pull Requests entrarem sem conflito.
4. Se a pessoa já tiver um arquivo, **atualize o dela** em vez de criar um segundo.
5. Não mexa em mais nada: nem no layout, nem no tema, nem no arquivo de outra pessoa.

## Idioma

| O quê                                                             | Idioma        |
| ----------------------------------------------------------------- | ------------- |
| Código: variáveis, funções, componentes, props, comentários         | **inglês**    |
| Nomes de teste (`describe`/`it`)                                    | **inglês**    |
| Texto que aparece na tela, incluindo `aria-label` e `placeholder`    | **português** |
| README, AGENTS.md, template de PR, comentários dos workflows         | **português** |
| Arquivos de `src/participants/` — comentários e valores               | **português** |
| Mensagens que os scripts de `scripts/` imprimem no terminal          | **português** |

Ou seja: `const [query, setQuery] = useState('')` renderizando
`placeholder="Buscar participante"`.

Os arquivos de `src/participants/` são a exceção da regra de comentários: são os arquivos que os
participantes criam, então as instruções dentro deles ficam em português. Nos scripts de `scripts/`
os comentários estão misturados — siga o idioma que já predomina no arquivo que você está editando.

## Estrutura

```
src/
  participants/           <- um arquivo por pessoa; e aqui que os participantes criam o seu
    index.js              <- registro automatico (NAO precisa editar)
    claude.js             <- modelo: `export const participant = { name, github?, message? }`
  participants.test.js    <- confere se cada arquivo esta preenchido certo
  components/
    Layout.jsx            <- cabecalho, container e rodape
    ParticipantRow.jsx    <- uma linha do mural: trofeu, nome, recado e @usuario
  pages/
    Home.jsx              <- pagina unica: hero, os tres passos e o mural
    NotFound.jsx          <- 404
  App.jsx                 <- as duas rotas: a home e o 404
  site.test.jsx           <- confere a home (nomes, busca, link do GitHub) e o 404
  theme.jsx               <- tema global do MUI (claro/escuro)
  config.js               <- URL do repositorio
scripts/                  <- uso da organizacao: extrair usuarios do form e convidar
.github/workflows/        <- deploy no Pages, verificacoes de PR e limpeza da branch
```

## Mexendo no site em si (raro)

Só quando o pedido for explicitamente sobre o site, e não sobre entrar no mural:

- **JavaScript + JSX** (sem TypeScript) e componentes do **MUI** (`@mui/material`,
  `@mui/icons-material`). Não adicione dependências novas sem necessidade real.
- Ícones vêm de `@mui/icons-material`, nunca emoji.
- Use as cores do tema (`color="primary"`, `sx={{ color: 'text.secondary' }}`) em vez de cores fixas,
  para funcionar no modo claro **e** no escuro.
- Para trechos técnicos (comandos, caminhos, números em destaque), aplique a fonte monoespaçada do
  tema: `sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono }}`.
- Prefira bordas finas (`border: 1, borderColor: 'divider'`, e o `Card` já vem `variant="outlined"`
  do tema) a sombras e gradientes; o visual é sóbrio, com bastante respiro.
- Os testes existentes são a rede de segurança da oficina: eles apontam o erro de digitação de quem
  está entrando no mural. Não os deixe mais rígidos do que isso e nunca adicione um teste que reprove
  o Pull Request de alguém pelo nome do arquivo ou pelo conteúdo do recado.
