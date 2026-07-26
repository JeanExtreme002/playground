import { describe, expect, it } from 'vitest'
import { findProject, projects } from './index.js'

/**
 * These tests only check the project "contract" — whether a folder really
 * became a page. They never look at the content of anyone's project, so you
 * are free to design your page however you like.
 */
describe('project registry', () => {
  it('finds at least one project', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('has no two projects sharing the same address', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('looks a project up by slug and returns undefined for unknown ones', () => {
    expect(findProject('sample')?.title).toBe('Projeto Exemplo')
    expect(findProject('projeto-que-nao-existe')).toBeUndefined()
  })
})

describe.each(projects.map((project) => [project.slug, project]))('project /%s', (slug, project) => {
  it('has a valid address (lowercase letters, digits and hyphens only)', () => {
    // Failing? Rename the project folder:
    // "Projeto do Fulano" -> "projeto-do-fulano"
    expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('exports a React component', () => {
    // Failing? The `export default function ...` is missing from index.jsx
    expect(typeof project.Component).toBe('function')
  })

  it('has a title, an author and an icon', () => {
    expect(project.title.trim()).not.toBe('')
    expect(project.author.trim()).not.toBe('')
    expect(project.Icon).toBeTruthy() // comes from @mui/icons-material
  })
})
