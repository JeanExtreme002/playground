import { useMemo, useState } from 'react'
import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined'
import SearchIcon from '@mui/icons-material/Search'
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined'
import ProjectCard from '../components/ProjectCard.jsx'
import { REPO_URL } from '../config.js'
import { projects } from '../projects/index.js'

const STEPS = [
  {
    icon: ContentCopyOutlinedIcon,
    title: 'Copie a pasta',
    text: 'Duplique src/projects/sample e dê a ela o nome do seu projeto.',
  },
  {
    icon: EditOutlinedIcon,
    title: 'Edite o index.jsx',
    text: 'Troque o conteúdo pelo seu. Componentes prontos do MUI a vontade.',
  },
  {
    icon: PublishedWithChangesOutlinedIcon,
    title: 'Abra o Pull Request',
    text: 'Ao entrar na main, sua página sobe sozinha em cerca de um minuto.',
  },
]

export default function Home() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return projects

    return projects.filter((project) =>
      [project.title, project.author, project.description, project.slug, ...project.tags]
        .join(' ')
        .toLowerCase()
        .includes(term),
    )
  }, [query])

  return (
    <Stack spacing={{ xs: 7, md: 10 }}>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <Box component="section" sx={{ maxWidth: 660 }}>
        <Typography variant="overline" color="primary" display="block" gutterBottom>
          OFICINA DE GIT &amp; GITHUB
        </Typography>

        <Typography variant="h1" gutterBottom>
          Seu primeiro projeto
          <Box component="span" sx={{ color: 'text.secondary' }}>
            {' '}
            no ar.
          </Box>
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2.5, maxWidth: 560 }}>
          Uma vitrine coletiva. Cada pessoa cria uma pasta, abre um Pull Request e ganha uma pagina
          publicada na internet — com endereço próprio.
        </Typography>

        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mt: 4 }}>
          <Button
            variant="contained"
            endIcon={<ArrowOutwardIcon sx={{ fontSize: 16 }} />}
            href={`${REPO_URL}#como-publicar-seu-projeto`}
            target="_blank"
            rel="noreferrer"
          >
            Publicar meu projeto
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

      {/* ── Project list ────────────────────────────────────────────────── */}
      <Box component="section">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ sm: 'baseline' }}
          justifyContent="space-between"
          sx={{ mb: 3.5 }}
        >
          <Stack direction="row" spacing={1.25} alignItems="baseline">
            <Typography variant="h2">Projetos</Typography>
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono }}
            >
              {String(projects.length).padStart(2, '0')}
            </Typography>
          </Stack>

          <TextField
            size="small"
            placeholder="Buscar projeto, autor ou tag"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            sx={{ minWidth: { sm: 300 } }}
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
            <Typography color="text.secondary">Nenhum projeto encontrado para "{query}".</Typography>
          </Stack>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gap: 2.5,
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            }}
          >
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Box>
        )}
      </Box>
    </Stack>
  )
}
