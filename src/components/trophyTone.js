// Alguns recados deixam o trofeu dourado em vez da cor do tema.
//
// A tabela guarda a assinatura desses recados, nao o texto deles: e assim de
// proposito, para o resultado do mural nao ser lido antes da hora.
const GOLDEN = new Set([1174113928])

// Quantos caracteres a assinatura cobre, no maximo.
const WINDOW = 16

/**
 * Percorre os trechos do recado e devolve `true` quando um deles bate com a
 * tabela acima. Maiusculas nao importam.
 */
export function isGolden(message) {
  const text = String(message ?? '').toLowerCase()

  for (let start = 0; start < text.length; start += 1) {
    let signature = 5381
    const limit = Math.min(text.length, start + WINDOW)

    for (let end = start; end < limit; end += 1) {
      signature = ((signature * 33) ^ text.charCodeAt(end)) >>> 0
      if (GOLDEN.has(signature)) return true
    }
  }

  return false
}
