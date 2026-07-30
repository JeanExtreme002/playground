/**
 * Automatic registry of the wall.
 *
 * Nobody needs to edit this file. Creating one file in this folder is enough to
 * show up on the site:
 *
 *   src/participants/maria-silva.js  ->  a trophy with Maria's name
 *
 * Each person owns their own file, so two Pull Requests never touch the same
 * line — they merge without conflict.
 */
const modules = import.meta.glob('./*.js', { eager: true })

export const participants = Object.entries(modules)
  // This very file is picked up by the glob too, and it exports no `participant`.
  .filter(([, module]) => module.participant)
  .map(([path, module]) => ({
    // "./maria-silva.js" -> "src/participants/maria-silva.js", used by the tests
    // to say which file needs a fix.
    file: path.replace('./', 'src/participants/'),
    ...module.participant,
  }))
  .sort((a, b) => String(a.name).localeCompare(String(b.name), 'pt-BR'))
