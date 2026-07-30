import { Box, Link, Stack, Typography } from '@mui/material'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'

/** One line of the wall: trophy, name, message and the GitHub handle. */
export default function ParticipantRow({ participant, isFirst }) {
  const { name, github, message } = participant

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
          color: 'primary.main',
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'rgba(197, 64, 42, 0.09)' : 'rgba(255, 138, 107, 0.13)'),
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
