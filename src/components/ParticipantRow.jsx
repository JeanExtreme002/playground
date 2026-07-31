import { Box, Link, Stack, Typography } from '@mui/material'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import { isGolden } from './trophyTone.js'

// Os dois tons possiveis do trofeu: o dourado e a cor do tema.
const TROPHY = {
  golden: { icon: ['#a87c10', '#e8c14a'], box: ['rgba(168, 124, 16, 0.12)', 'rgba(232, 193, 74, 0.15)'] },
  theme: { icon: ['#2a7a4b', '#6fd39b'], box: ['rgba(42, 122, 75, 0.09)', 'rgba(111, 211, 155, 0.13)'] },
}

/** One line of the wall: trophy, name, message and the GitHub handle. */
export default function ParticipantRow({ participant, isFirst }) {
  const { name, github, message } = participant

  const tone = isGolden(message) ? TROPHY.golden : TROPHY.theme
  const pick = (pair) => (theme) => (theme.palette.mode === 'light' ? pair[0] : pair[1])

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
          width: 36,
          height: 36,
          flexShrink: 0,
          borderRadius: 2,
          display: 'grid',
          placeItems: 'center',
          color: pick(tone.icon),
          bgcolor: pick(tone.box),
        }}
      >
        <EmojiEventsOutlinedIcon sx={{ fontSize: 20 }} />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="h6">{name}</Typography>
        {message && (
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
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
