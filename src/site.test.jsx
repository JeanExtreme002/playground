import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

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
    expect(screen.getByRole('heading', { name: /seu primeiro projeto/i })).toBeInTheDocument()
  })

  it('lists the projects, each linking to its own page', () => {
    renderAt('/')
    const link = screen.getByRole('link', { name: /projeto exemplo/i })
    expect(link).toHaveAttribute('href', '/sample')
  })

  it('filters the list as the user types', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.type(screen.getByPlaceholderText(/buscar projeto/i), 'zzz')

    expect(screen.queryByRole('link', { name: /projeto exemplo/i })).not.toBeInTheDocument()
    expect(screen.getByText(/nenhum projeto encontrado/i)).toBeInTheDocument()
  })
})

describe('routing', () => {
  it('/sample opens the sample project', () => {
    renderAt('/sample')
    expect(screen.getByRole('heading', { name: 'Projeto Exemplo' })).toBeInTheDocument()
  })

  it('an unknown address falls back to the 404 page', () => {
    renderAt('/projeto-que-nao-existe')
    expect(screen.getByText(/pagina nao encontrada/i)).toBeInTheDocument()
  })
})
