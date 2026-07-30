import { useMemo, useState } from 'react'
import { Box, Button, Card, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import CallSplitOutlinedIcon from '@mui/icons-material/CallSplitOutlined'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined'
import SearchIcon from '@mui/icons-material/Search'
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined'
import { Link as RouterLink } from 'react-router-dom'
import ParticipantRow from '../components/ParticipantRow.jsx'
import { REPO_URL } from '../config.js'
import { participants } from '../participants/index.js'

const STEPS = [
  {
    icon: CallSplitOutlinedIcon,
    title: 'Crie uma branch',
    text: 'Clone o repositorio e crie um galho novo, so seu, para trabalhar em paz.',
  },
  {
    icon: DriveFileRenameOutlineOutlinedIcon,
    title: 'Crie o seu arquivo',
    text: 'Um arquivo com o seu nome em src/participants — a IA faz isso para voce.',
  },
  {
    icon: PublishedWithChangesOutlinedIcon,
    title: 'Abra o Pull Request',
    text: 'Ao entrar na main, seu nome sobe para o mural em cerca de um minuto.',
  },
]


export default function Home() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return participants

    return participants.filter((participant) =>
      [participant.name, participant.github, participant.message]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(term),
    )
  }, [query])

  return (
    // `useFlexGap` spaces the sections with `gap` instead of margins. Without it
    // the Stack resets the children's margin, and `mx: 'auto'` on the wall of
    // achievements below would never center it.
    <Stack spacing={{ xs: 7, md: 10 }} useFlexGap>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <Box component="section" sx={{ maxWidth: 660 }}>
        <Typography variant="overline" color="primary" display="block" gutterBottom>
          OFICINA DE GIT &amp; GITHUB
        </Typography>

        <Typography variant="h1" gutterBottom>
          Seu nome no mural
          <Box component="span" sx={{ color: 'text.secondary' }}>
            {' '}
            de conquistas.
          </Box>
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2.5, maxWidth: 560 }}>
          Aqui ficam as pessoas que abriram um Pull Request e conseguiram fazer o merge. O desafio e
          esse: adicionar seu nome a lista e levar a mudanca ate a branch main.
        </Typography>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mt: 4 }}>
          <Button
            variant="contained"
            endIcon={<ArrowOutwardIcon sx={{ fontSize: 16 }} />}
            href={`${REPO_URL}#como-entrar-no-mural`}
            target="_blank"
            rel="noreferrer"
          >
            Entrar no mural
          </Button>
          <Button
            variant="text"
            color="inherit"
            startIcon={<GitHubIcon sx={{ fontSize: 18 }} />}
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            sx={{ color: 'text.secondary' }}
          >
            Ver o repositório
          </Button>
        </Stack>
      </Box>

      {/* ── How it works: three steps split by hairlines ─────────────────── */}
      <Box
        component="section"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          border: 1,
          borderColor: 'divider',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        {STEPS.map((step, index) => {
          const StepIcon = step.icon

          return (
            <Box
              key={step.title}
              sx={{
                p: 3,
                borderTop: { xs: index === 0 ? 0 : 1, md: 0 },
                borderLeft: { xs: 0, md: index === 0 ? 0 : 1 },
                borderColor: { xs: 'divider', md: 'divider' },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                <StepIcon sx={{ fontSize: 19, color: 'primary.main' }} />
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
              </Stack>
              <Typography variant="h6" gutterBottom>
                {step.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {step.text}
              </Typography>
            </Box>
          )
        })}
      </Box>

      {/* ── Wall of achievements: a single centered list ─────────────────── */}
      <Box component="section" sx={{ width: '100%', maxWidth: 720, mx: 'auto' }}>
        <Stack alignItems="center" spacing={2.5} sx={{ mb: 3.5 }}>
          <Stack direction="row" spacing={1.25} alignItems="baseline">
            <Typography variant="h2">Mural de conquistas</Typography>
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono }}
            >
              {String(participants.length).padStart(2, '0')}
            </Typography>
          </Stack>

          <TextField
            size="small"
            placeholder="Buscar participante"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            sx={{ width: '100%', maxWidth: 340 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {filtered.length === 0 ? (
          <Stack alignItems="center" spacing={1} sx={{ py: 8, border: 1, borderColor: 'divider', borderRadius: 3 }}>
            <SearchOffOutlinedIcon sx={{ fontSize: 30, color: 'text.disabled' }} />
            <Typography color="text.secondary">Nenhum participante encontrado para "{query}".</Typography>
          </Stack>
        ) : (
          <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
            {filtered.map((participant, index) => (
              <ParticipantRow key={participant.name} participant={participant} isFirst={index === 0} />
            ))}
          </Box>
        )}
      </Box>

      {/* ── Call to the next stage, which lives on its own page ─────────── */}
      <Box component="section" sx={{ width: '100%', maxWidth: 720, mx: 'auto' }}>
        <Card sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2.5}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="overline" color="primary" display="block" gutterBottom>
                PROXIMA ETAPA
              </Typography>
              <Typography variant="h6">A palavra-chave escondida</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                Ja esta no mural? Uma palavra-chave foi escrita em um commit deste repositorio e
                apagada em outro. Ache ela no historico do Git.
              </Typography>
            </Box>

            <Button
              component={RouterLink}
              to="/desafio"
              variant="contained"
              endIcon={<ManageSearchOutlinedIcon sx={{ fontSize: 18 }} />}
              sx={{ flexShrink: 0 }}
            >
              Ver o desafio
            </Button>
          </Stack>
        </Card>
      </Box>
    </Stack>
  )
}
