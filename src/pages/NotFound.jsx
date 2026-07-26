import { Box, Button, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <Stack spacing={2.5} alignItems="center" sx={{ py: { xs: 8, md: 14 }, textAlign: 'center' }}>
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: 3,
          display: 'grid',
          placeItems: 'center',
          border: 1,
          borderColor: 'divider',
          color: 'text.disabled',
        }}
      >
        <ExploreOutlinedIcon />
      </Box>

      <Typography variant="overline" color="text.disabled">
        ERRO 404
      </Typography>

      <Typography variant="h2">Pagina nao encontrada</Typography>

      <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
        Esse projeto ainda nao existe por aqui. Que tal voltar e escolher um da lista?
      </Typography>

      <Button component={RouterLink} to="/" variant="contained" startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}>
        Ver todos os projetos
      </Button>
    </Stack>
  )
}
