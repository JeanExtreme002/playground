import { useEffect } from 'react'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined'
import { Link as RouterLink } from 'react-router-dom'

// What the person types to the AI, one prompt at a time. The keyword itself is
// written nowhere in this repository: it only exists in the git history.
const PROMPTS = [
  {
    prompt: 'Veja os ultimos commits deste repositorio.',
    hint: 'A IA roda git log e te mostra tudo o que ja aconteceu por aqui.',
  },
  {
    prompt: 'Encontre o commit que adiciona uma palavra-chave.',
    hint: 'Um commit criou um arquivo com ela dentro. Outro, depois, apagou esse arquivo.',
  },
  {
    prompt: 'Leia a palavra-chave para mim.',
    hint: 'O conteudo do arquivo apagado continua guardado no historico.',
  },
  {
    prompt: 'Troque a minha mensagem no mural por essa palavra-chave.',
    hint: 'Ela edita o seu arquivo em src/participants/. Depois e o de sempre: branch, commit, Pull Request.',
  },
]

const COMMANDS = [
  { command: 'git log --oneline', hint: 'a lista de tudo que ja aconteceu por aqui' },
  { command: 'git log --diff-filter=D --name-only', hint: 'quais arquivos foram apagados, e em qual commit' },
  { command: 'git show <commit>', hint: 'o que exatamente mudou naquele commit' },
]

export default function Challenge() {
  useEffect(() => {
    document.title = 'A palavra-chave escondida · Playground'
    return () => {
      document.title = 'Playground'
    }
  }, [])

  return (
    <Stack spacing={{ xs: 5, md: 7 }} sx={{ width: '100%', maxWidth: 720, mx: 'auto' }} useFlexGap>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <Box component="header">
        <Button
          component={RouterLink}
          to="/"
          size="small"
          color="inherit"
          startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
          sx={{ ml: -1, mb: 3, color: 'text.secondary' }}
        >
          Mural
        </Button>

        <Typography variant="overline" color="primary" display="block" gutterBottom>
          PROXIMA ETAPA
        </Typography>

        <Typography variant="h2" component="h1">
          A palavra-chave escondida
        </Typography>

        <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mt: 3 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              flexShrink: 0,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              color: 'primary.main',
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? 'rgba(197, 64, 42, 0.09)' : 'rgba(255, 138, 107, 0.13)',
            }}
          >
            <ManageSearchOutlinedIcon sx={{ fontSize: 20 }} />
          </Box>

          <Typography variant="body1" color="text.secondary">
            Seu nome ja esta no mural? Entao vem a etapa seguinte. Uma palavra-chave foi escrita em um
            commit deste repositorio e apagada em outro. Hoje ela nao esta em nenhum arquivo: procurar
            na pasta do projeto nao acha nada. Ela existe so no historico do Git, que guarda tudo o que
            um dia passou por aqui.
          </Typography>
        </Stack>
      </Box>

      {/* ── The prompts, to paste one at a time ─────────────────────────── */}
      <Box component="section">
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
          <TerminalOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
          <Typography variant="overline" color="text.secondary">
            COLE UM POR VEZ NO CLAUDE
          </Typography>
        </Stack>

        <Card sx={{ overflow: 'hidden' }}>
          {PROMPTS.map(({ prompt, hint }, index) => (
            <Stack
              key={prompt}
              direction="row"
              spacing={1.5}
              alignItems="flex-start"
              sx={{
                px: { xs: 2, sm: 2.5 },
                py: 2.25,
                borderTop: index === 0 ? 0 : 1,
                borderColor: 'divider',
              }}
            >
              <Typography
                sx={{
                  color: 'primary.main',
                  lineHeight: 1.6,
                  fontFamily: (theme) => theme.typography.fontFamilyMono,
                }}
              >
                &gt;
              </Typography>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono, fontSize: '0.9rem' }}>
                  {prompt}
                </Typography>
                <Typography variant="caption" color="text.disabled" display="block" sx={{ mt: 0.75 }}>
                  {hint}
                </Typography>
              </Box>

              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ flexShrink: 0, fontFamily: (theme) => theme.typography.fontFamilyMono }}
              >
                {String(index + 1).padStart(2, '0')}
              </Typography>
            </Stack>
          ))}
        </Card>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2.5 }}>
          Achou? Nao conte para ninguem. Deixe cada pessoa achar a sua.
        </Typography>
      </Box>

      {/* ── For whoever wants to dig with their own hands ───────────────── */}
      <Box component="section">
        <Typography variant="overline" color="text.secondary" display="block" gutterBottom>
          PREFERE FAZER NA MAO?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Os mesmos passos, direto no terminal. Sao estes comandos que a IA usa por baixo.
        </Typography>

        {/* The commands live in an array so `<commit>` stays plain text. */}
        <Box sx={{ overflowX: 'auto' }}>
          {COMMANDS.map(({ command, hint }) => (
            <Box key={command} sx={{ py: 0.75 }}>
              <Typography
                component="code"
                sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono, fontSize: '0.83rem' }}
              >
                {command}
              </Typography>
              <Typography variant="caption" color="text.disabled" display="block">
                {hint}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  )
}
