import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { AppThemeProvider } from '../../theme.jsx'
import SampleProject from './index.jsx'

/**
 * Example of a project test. Testing your own project is OPTIONAL — if you
 * never create a `.test.jsx` file, everything still works.
 *
 * A test is always the same three steps:
 *   1. render the component
 *   2. do what a person would do (click, type)
 *   3. check what showed up on screen
 */
function renderProject() {
  return render(
    <AppThemeProvider>
      <SampleProject />
    </AppThemeProvider>,
  )
}

describe('sample project', () => {
  it('adds and subtracts on the counter', async () => {
    const user = userEvent.setup()
    renderProject()

    expect(screen.getByText('0')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Aumentar' }))
    await user.click(screen.getByRole('button', { name: 'Aumentar' }))
    expect(screen.getByText('2')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Diminuir' }))
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('greets the name typed into the form', async () => {
    const user = userEvent.setup()
    renderProject()

    await user.type(screen.getByPlaceholderText(/como voce se chama/i), 'Fulano')
    await user.click(screen.getByRole('button', { name: /enviar/i }))

    expect(screen.getByText('Prazer, Fulano!')).toBeInTheDocument()
  })
})
