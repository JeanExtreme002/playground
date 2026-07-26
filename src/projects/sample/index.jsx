import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import RemoveIcon from '@mui/icons-material/Remove'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import TagOutlinedIcon from '@mui/icons-material/TagOutlined'
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import VolumeDownOutlinedIcon from '@mui/icons-material/VolumeDownOutlined'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined'

// ─────────────────────────────────────────────────────────────────────────────
// 1) META: shown on the card in the home page.
//    Pick an icon at https://mui.com/material-ui/material-icons/, import it
//    above and drop it here (no <> and no quotes).
//
//    Code is written in English; the text shown on screen stays in Portuguese.
// ─────────────────────────────────────────────────────────────────────────────
export const meta = {
  title: 'Projeto Exemplo',
  author: 'Equipe da Oficina',
  description: 'Um tour rapido pelos componentes do MUI para voce copiar e colar.',
  icon: PaletteOutlinedIcon,
  github: 'JeanExtreme002',
  tags: ['exemplo', 'mui', 'react'],
}

// A card with an icon and a title. A tiny component like this keeps us from
// repeating the same block four times below.
function Section({ icon: Icon, title, children }) {
  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2.5 }}>
        <Icon sx={{ fontSize: 18, color: 'text.disabled' }} />
        <Typography variant="overline" color="text.secondary">
          {title}
        </Typography>
      </Stack>
      {children}
    </Card>
  )
}

const GIT_COMMANDS = ['git clone', 'git checkout -b', 'git commit -m', 'git push', 'pull request']

// ─────────────────────────────────────────────────────────────────────────────
// 2) THE COMPONENT: everything that shows up on your page.
//    `export default` is required — that is how the site finds the page.
// ─────────────────────────────────────────────────────────────────────────────
export default function SampleProject() {
  // `useState` holds values that change on screen:
  // [currentValue, functionThatChangesIt] = useState(initialValue)
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState(null)
  const [volume, setVolume] = useState(30)
  const [rating, setRating] = useState(4)
  const [turbo, setTurbo] = useState(false)
  const [likes, setLikes] = useState(12)

  function handleSubmit(event) {
    event.preventDefault() // keeps the page from reloading
    setGreeting(name.trim() ? `Prazer, ${name.trim()}!` : 'Escreva seu nome primeiro.')
  }

  return (
    <Stack spacing={2.5}>
      <Alert severity="info" variant="outlined">
        Copie a pasta <code>src/projects/sample</code>, renomeie para o nome do seu projeto e comece a
        mexer.
      </Alert>

      {/* Grid: one column on phones, two columns on wider screens. */}
      <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
        {/* ─────────── Counter ─────────── */}
        <Section icon={AddIcon} title="CONTADOR">
          <Stack direction="row" spacing={2} alignItems="center">
            {/* `aria-label` describes the button to screen readers — and it is
                how the test in index.test.jsx finds this button. */}
            <IconButton
              aria-label="Diminuir"
              onClick={() => setCount(count - 1)}
              size="small"
              sx={{ border: 1, borderColor: 'divider' }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography
              sx={{
                minWidth: 80,
                textAlign: 'center',
                fontSize: 42,
                fontWeight: 500,
                lineHeight: 1,
                fontFamily: (theme) => theme.typography.fontFamilyMono,
              }}
            >
              {count}
            </Typography>

            <IconButton
              aria-label="Aumentar"
              onClick={() => setCount(count + 1)}
              size="small"
              sx={{ border: 1, borderColor: 'divider' }}
            >
              <AddIcon fontSize="small" />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

            <Button
              size="small"
              color="inherit"
              startIcon={<RestartAltIcon sx={{ fontSize: 16 }} />}
              onClick={() => setCount(0)}
              sx={{ color: 'text.secondary' }}
            >
              Zerar
            </Button>
          </Stack>
        </Section>

        {/* ─────────── Form ─────────── */}
        <Section icon={PersonOutlineIcon} title="FORMULARIO">
          <Stack component="form" onSubmit={handleSubmit} spacing={1.5}>
            <TextField
              size="small"
              placeholder="Como voce se chama?"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" endIcon={<SendOutlinedIcon sx={{ fontSize: 16 }} />}>
              Enviar
            </Button>
            {greeting && (
              <Alert severity="success" variant="outlined">
                {greeting}
              </Alert>
            )}
          </Stack>
        </Section>

        {/* ─────────── Controls ─────────── */}
        <Section icon={TuneOutlinedIcon} title="CONTROLES">
          <Stack spacing={2.5}>
            <Box>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <VolumeDownOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                <Slider value={volume} onChange={(event, value) => setVolume(value)} size="small" />
                <VolumeUpOutlinedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              </Stack>
              <LinearProgress
                variant="determinate"
                value={volume}
                sx={{ height: 4, borderRadius: 2, mt: 0.5 }}
              />
            </Box>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={1.25} alignItems="center">
                <BoltOutlinedIcon sx={{ fontSize: 18, color: turbo ? 'primary.main' : 'text.disabled' }} />
                <Typography variant="body2" color="text.secondary">
                  Modo turbo
                </Typography>
              </Stack>
              <Switch checked={turbo} onChange={(event) => setTurbo(event.target.checked)} size="small" />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Nota para a oficina
              </Typography>
              <Rating
                value={rating}
                onChange={(event, value) => setRating(value ?? 0)}
                size="small"
                icon={<FavoriteIcon fontSize="inherit" color="primary" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              />
            </Stack>
          </Stack>
        </Section>

        {/* ─────────── List ─────────── */}
        <Section icon={TerminalOutlinedIcon} title="O CAMINHO ATE AQUI">
          <List dense disablePadding>
            {GIT_COMMANDS.map((command) => (
              <ListItem key={command} disableGutters disablePadding sx={{ py: 0.35 }}>
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <CheckCircleOutlineIcon sx={{ fontSize: 17, color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText
                  primary={command}
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: { fontFamily: (theme) => theme.typography.fontFamilyMono },
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2.5 }}>
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              startIcon={<FavoriteBorderIcon sx={{ fontSize: 16 }} />}
              onClick={() => setLikes(likes + 1)}
            >
              Curtir
            </Button>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <TagOutlinedIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono }}
              >
                {likes}
              </Typography>
            </Stack>
          </Stack>
        </Section>
      </Box>
    </Stack>
  )
}
