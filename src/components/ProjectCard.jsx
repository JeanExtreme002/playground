import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Link as RouterLink } from 'react-router-dom'

export default function ProjectCard({ project }) {
  const { Icon } = project

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'border-color .16s ease, background-color .16s ease',
        '&:hover': { borderColor: 'primary.main' },
        '&:hover .card-arrow': { transform: 'translateX(3px)', color: 'primary.main' },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/${project.slug}`}
        sx={{ height: '100%', p: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              color: 'primary.main',
              bgcolor: (theme) => (theme.palette.mode === 'light' ? 'rgba(197, 64, 42, 0.09)' : 'rgba(255, 138, 107, 0.13)'),
            }}
          >
            <Icon sx={{ fontSize: 21 }} />
          </Box>

          {project.tags.length > 0 && (
            <Chip label={project.tags[0]} size="small" variant="outlined" sx={{ mt: 0.25 }} />
          )}
        </Stack>

        <Typography variant="h6" sx={{ mt: 2 }}>
          {project.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {project.author}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.25, flexGrow: 1 }}>
          {project.description}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 2.5, pt: 1.75, borderTop: 1, borderColor: 'divider' }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            noWrap
            sx={{ fontFamily: (theme) => theme.typography.fontFamilyMono }}
          >
            /{project.slug}
          </Typography>
          <ArrowForwardIcon
            className="card-arrow"
            sx={{ fontSize: 17, color: 'text.disabled', transition: 'transform .16s ease, color .16s ease' }}
          />
        </Stack>
      </CardActionArea>
    </Card>
  )
}
