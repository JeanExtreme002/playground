import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'
import { participants } from './participants/index.js'

// Opens the site at a given route, as if the user had typed the URL.
function renderAt(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

describe('home page', () => {
  it('shows the headline', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: /seu nome no mural/i })).toBeInTheDocument()
  })

  it('shows every name from the list', () => {
    renderAt('/')

    for (const participant of participants) {
      expect(screen.getByText(participant.name)).toBeInTheDocument()
    }
  })

  // No name is hardcoded here on purpose: people come and go from the wall with
  // every Pull Request, and nobody's PR should fail because of that.
  it('links a participant to their github profile', () => {
    renderAt('/')

    const participant = participants.find((candidate) => candidate.github)
    if (!participant) return

    const link = screen.getByRole('link', { name: `@${participant.github}` })
    expect(link).toHaveAttribute('href', `https://github.com/${participant.github}`)
  })

  it('points to the next stage on its own page', () => {
    renderAt('/')

    expect(screen.getByRole('link', { name: /ver o desafio/i })).toHaveAttribute('href', '/desafio')
  })

  it('filters the list as the user types', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.type(screen.getByPlaceholderText(/buscar participante/i), 'zzz')

    expect(screen.queryByText(participants[0].name)).not.toBeInTheDocument()
    expect(screen.getByText(/nenhum participante encontrado/i)).toBeInTheDocument()
  })
})

describe('routing', () => {
  it('/desafio opens the keyword hunt, with the prompts to paste', () => {
    renderAt('/desafio')

    expect(screen.getByRole('heading', { name: /palavra-chave escondida/i })).toBeInTheDocument()
    expect(screen.getByText(/veja os últimos commits/i)).toBeInTheDocument()
    expect(screen.getByText(/troque a minha mensagem no mural/i)).toBeInTheDocument()
  })

  it('an unknown address falls back to the 404 page', () => {
    renderAt('/endereco-que-nao-existe')
    expect(screen.getByText(/pagina nao encontrada/i)).toBeInTheDocument()
  })
})
