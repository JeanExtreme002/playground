import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AppThemeProvider } from '../../theme.jsx'
import PsychologyOffice from './index.jsx'

function renderProject() {
  return render(
    <AppThemeProvider>
      <PsychologyOffice />
    </AppThemeProvider>,
  )
}

// The page is long, so it re-renders on every keystroke. `fireEvent.change`
// fills a field with a single event, which keeps these tests fast.
function fillField(label, value) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } })
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('psychology office landing page', () => {
  it('asks for name and contact before opening WhatsApp', async () => {
    const user = userEvent.setup()
    // jsdom has no real window.open, so we stand in for it and check the URL.
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    renderProject()

    await user.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }))
    expect(screen.getByText(/preencha seu nome/i)).toBeInTheDocument()
    expect(open).not.toHaveBeenCalled()

    fillField('Seu nome', 'Joana Souza')
    fillField('Telefone ou e-mail', 'joana@exemplo.com')
    await user.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }))

    expect(screen.getByText(/prontinho, joana/i)).toBeInTheDocument()
    expect(open).toHaveBeenCalledOnce()

    const [url] = open.mock.calls[0]
    expect(url).toContain('https://wa.me/')
    expect(url).toContain(encodeURIComponent('Joana Souza'))
    expect(url).toContain(encodeURIComponent('joana@exemplo.com'))
  })

  it('opens a question from the FAQ', async () => {
    const user = userEvent.setup()
    renderProject()

    await user.click(screen.getByRole('button', { name: /quanto tempo dura o processo/i }))
    expect(screen.getByText(/revisamos os objetivos periodicamente/i)).toBeVisible()
  })
})
