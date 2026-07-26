import { useEffect } from 'react'
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Link as RouterLink, useParams } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary.jsx'
import { findProject } from '../projects/index.js'
import NotFound from './NotFound.jsx'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = findProject(slug)

  useEffect(() => {
    document.title = project ? `${project.title} · Playground` : 'Playground'
  }, [project])

  if (!project) return <NotFound />

  const { Component, Icon } = project

  return (
    <Stack spacing={4}>
      <Box component="header">
        <Button
          component={RouterLink}
          to="/"
          size="small"
          color="inherit"
          startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
          sx={{ ml: -1, mb: 3, color: 'text.secondary' }}
        >
          Projetos
        </Button>

        <Stack direction="row" spacing={2.5} alignItems="flex-start">
          <Box
            sx={{
              width: 48,
              height: 48,
              flexShrink: 0,
              borderRadius: 2.5,
              display: 'grid',
              placeItems: 'center',
              color: 'primary.main',
              bgcolor: (theme) => (theme.palette.mode === 'light' ? 'rgba(197, 64, 42, 0.09)' : 'rgba(255, 138, 107, 0.13)'),
            }}
          >
            <Icon sx={{ fontSize: 26 }} />
          </Box>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="h2">{project.title}</Typography>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mt: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                {project.author}
              </Typography>
              <Typography variant="body2" color="text.disabled">
                ·
              </Typography>
              <Typography
                variant="body2"
                color="text.disabled"
                sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono }}
              >
                /{project.slug}
              </Typography>
            </Stack>
          </Box>

          {project.github && (
            <Button
              size="small"
              color="inherit"
              startIcon={<GitHubIcon sx={{ fontSize: 16 }} />}
              href={`https://github.com/${project.github}`}
              target="_blank"
              rel="noreferrer"
              sx={{ flexShrink: 0, color: 'text.secondary', fontFamily: (theme) => theme.typography.fontFamilyMono }}
            >
              {project.github}
            </Button>
          )}
        </Stack>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 2.5, maxWidth: 640 }}>
          {project.description}
        </Typography>

        {project.tags.length > 0 && (
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
            {project.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Stack>
        )}
      </Box>

      <Divider />

      {/* From here down it is someone else's project. If it throws, only this
          area shows the error — the rest of the site keeps working. */}
      <Box component="section">
        <ErrorBoundary projectTitle={project.title}>
          <Component />
        </ErrorBoundary>
      </Box>
    </Stack>
  )
}
