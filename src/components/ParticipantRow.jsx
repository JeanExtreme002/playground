import { Box, Link, Stack, Typography } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined'
import { isGolden } from './trophyTone.js'

// Recadinho pessoal: um unico participante troca o trofeu por uma fatia de pizza.
const PIZZA_GITHUB = 'v-fraga'

// Os dois tons possiveis do trofeu: o dourado e a cor do tema.
const TROPHY = {
  golden: { icon: ['#a87c10', '#e8c14a'], box: ['rgba(168, 124, 16, 0.12)', 'rgba(232, 193, 74, 0.15)'] },
  theme: { icon: ['#2a7a4b', '#6fd39b'], box: ['rgba(42, 122, 75, 0.09)', 'rgba(111, 211, 155, 0.13)'] },
}

// O recado que o trofeu dourado mostra, no lugar do que a pessoa escreveu.
const GOLDEN_MESSAGE = 'Completou o desafio bônus!'

// O brilho em volta do trofeu dourado, e o piscar das faiscas nos cantos.
const GLOW = {
  animation: 'trophyGlow 2.6s ease-in-out infinite',
  '@keyframes trophyGlow': {
    '0%, 100%': { boxShadow: '0 0 0 0 rgba(232, 193, 74, 0.45)' },
    '55%': { boxShadow: '0 0 0 7px rgba(232, 193, 74, 0)' },
  },
  // Quem pediu menos movimento no sistema fica so com o dourado, sem animacao.
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
}

const SPARK = {
  position: 'absolute',
  animation: 'sparkTwinkle 2.1s ease-in-out infinite',
  '@keyframes sparkTwinkle': {
    '0%, 100%': { opacity: 0.25, transform: 'scale(0.7) rotate(0deg)' },
    '50%': { opacity: 1, transform: 'scale(1) rotate(20deg)' },
  },
  '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 0.9 },
}

/** One line of the wall: trophy, name, message and the GitHub handle. */
export default function ParticipantRow({ participant, isFirst }) {
  const { name, github, message } = participant

  const golden = isGolden(message)
  const tone = golden ? TROPHY.golden : TROPHY.theme
  const pick = (pair) => (theme) => (theme.palette.mode === 'light' ? pair[0] : pair[1])
  const TrophyIcon = github === PIZZA_GITHUB ? LocalPizzaOutlinedIcon : EmojiEventsOutlinedIcon

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        px: { xs: 2, sm: 3 },
        py: 2.25,
        borderTop: isFirst ? 0 : 1,
        borderColor: 'divider',
        transition: 'background-color .16s ease',
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 36,
          height: 36,
          flexShrink: 0,
          borderRadius: 2,
          display: 'grid',
          placeItems: 'center',
          color: pick(tone.icon),
          bgcolor: pick(tone.box),
          ...(golden && GLOW),
        }}
      >
        <TrophyIcon sx={{ fontSize: 20 }} />

        {golden && (
          <>
            <AutoAwesomeIcon sx={{ ...SPARK, top: -5, right: -5, fontSize: 11 }} />
            <AutoAwesomeIcon sx={{ ...SPARK, bottom: -4, left: -5, fontSize: 9, animationDelay: '1.05s' }} />
          </>
        )}
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="h6">{name}</Typography>
        {golden ? (
          <Typography variant="body2" sx={{ color: pick(tone.icon), fontWeight: 500 }}>
            {GOLDEN_MESSAGE}
          </Typography>
        ) : (
          message && (
            <Typography variant="body2" color="text.secondary">
              {message}
            </Typography>
          )
        )}
      </Box>

      {github && (
        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ flexShrink: 0 }}>
          <GitHubIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
          <Link
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noreferrer"
            variant="caption"
            underline="hover"
            color="text.secondary"
            noWrap
            sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono }}
          >
            @{github}
          </Link>
        </Stack>
      )}
    </Stack>
  )
}
