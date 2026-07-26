import { AppBar, Box, Container, IconButton, Link, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { Link as RouterLink, Outlet } from 'react-router-dom'
import { REPO_URL } from '../config.js'
import { useColorMode } from '../theme.jsx'

export default function Layout() {
  const { mode, toggle } = useColorMode()

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.default',
          backdropFilter: 'saturate(180%) blur(8px)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 60, md: 68 }, gap: 0.5 }}>
            <Stack
              component={RouterLink}
              to="/"
              direction="row"
              spacing={1.25}
              alignItems="center"
              sx={{ flexGrow: 1, textDecoration: 'none', color: 'text.primary' }}
            >
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: 2,
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                }}
              >
                <CodeRoundedIcon sx={{ fontSize: 19 }} />
              </Box>
              <Typography variant="h6" sx={{ letterSpacing: '-0.02em' }}>
                Playground
              </Typography>
            </Stack>

            <Tooltip title={mode === 'light' ? 'Modo escuro' : 'Modo claro'}>
              <IconButton
                onClick={toggle}
                size="small"
                aria-label="Alternar modo claro e escuro"
                sx={{ color: 'text.secondary' }}
              >
                {mode === 'light' ? (
                  <DarkModeOutlinedIcon fontSize="small" />
                ) : (
                  <LightModeOutlinedIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Ver no GitHub">
              <IconButton
                component="a"
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                size="small"
                aria-label="Ver no GitHub"
                sx={{ color: 'text.secondary' }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>

      <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 2.5 }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            justifyContent="space-between"
            alignItems={{ sm: 'center' }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono }}>
              Oficina de Git &amp; Github
            </Typography>
            <Link
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              variant="caption"
              underline="hover"
              color="text.secondary"
              sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono }}
            >
              JeanExtreme002/playground
            </Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
