import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined'

/**
 * Automatic project registry.
 *
 * Nobody needs to edit this file. Creating a folder under `src/projects/` with
 * an `index.jsx` inside is enough to publish a page:
 *
 *   src/projects/projeto-de-fulano/index.jsx  ->  /playground/projeto-de-fulano
 */
const modules = import.meta.glob('./*/index.jsx', { eager: true })

export const projects = Object.entries(modules)
  .map(([path, module]) => {
    // "./projeto-de-fulano/index.jsx" -> "projeto-de-fulano"
    const slug = path.split('/')[1]
    // Every field falls back to a default, so a project with no `meta` at all
    // still shows up correctly on the home page.
    const meta = module.meta ?? {}

    return {
      slug,
      Component: module.default,
      title: meta.title ?? slug,
      author: meta.author ?? 'Anonimo',
      description: meta.description ?? 'Um projeto da oficina de Git e GitHub.',
      // A MUI icon (the component itself, not its name). E.g. icon: RocketLaunchIcon
      Icon: meta.icon ?? ExtensionOutlinedIcon,
      github: meta.github ?? null,
      tags: meta.tags ?? [],
    }
  })
  .filter((project) => typeof project.Component === 'function')
  .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))

export const findProject = (slug) => projects.find((project) => project.slug === slug)
