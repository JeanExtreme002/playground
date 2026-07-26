import { Component } from 'react'
import { Alert, AlertTitle, Box } from '@mui/material'

/**
 * Keeps an error inside one project from taking the whole site down.
 * It has to be a class component: React only exposes this API that way.
 */
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Erro no projeto:', error, info)
  }

  render() {
    const { error } = this.state

    if (error) {
      return (
        <Alert severity="error" variant="outlined">
          <AlertTitle>Este projeto quebrou 😅</AlertTitle>
          O projeto "{this.props.projectTitle}" lancou um erro ao ser exibido.
          <Box component="pre" sx={{ mt: 1, mb: 0, whiteSpace: 'pre-wrap', fontSize: 13 }}>
            {String(error?.message ?? error)}
          </Box>
        </Alert>
      )
    }

    return this.props.children
  }
}
