import { describe, expect, it } from 'vitest'
import { participants } from './participants/index.js'

/**
 * These tests only check that every file in `src/participants/` is filled in
 * correctly. They run on every Pull Request, so a typo is caught before the
 * merge — and the message below says exactly what to fix.
 */

// GitHub username rules: letters, digits and hyphens, up to 39 characters.
const GITHUB_USERNAME = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/

describe('wall of achievements', () => {
  it('finds at least one participant', () => {
    // Failing? A file in src/participants/ needs `export const participant`.
    expect(participants.length).toBeGreaterThan(0)
  })

  it('has no repeated github username', () => {
    // Failing? You already have a file here — edit yours instead of adding another.
    const usernames = participants
      .map((participant) => participant.github?.toLowerCase())
      .filter(Boolean)

    expect(new Set(usernames).size).toBe(usernames.length)
  })
})

describe.each(participants.map((participant) => [participant.file, participant]))(
  '%s',
  (file, participant) => {
    it('has a name', () => {
      // Failing? The file is missing `name: 'Seu Nome'`.
      expect(typeof participant.name).toBe('string')
      expect(participant.name.trim()).not.toBe('')
    })

    it('has a valid github username, when it has one', () => {
      // Failing? Write only the username: 'fulano', not '@fulano' nor a URL.
      if (participant.github == null) return
      expect(participant.github).toMatch(GITHUB_USERNAME)
    })

    it('has a short message, when it has one', () => {
      // Failing? Keep the message to a single line (up to 120 characters).
      if (participant.message == null) return
      expect(participant.message.length).toBeLessThanOrEqual(120)
    })
  },
)
