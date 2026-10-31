// Función de Netlify: corre en el servidor, nunca en el navegador.
// Lee un secreto y responde SOLO si existe y una "huella" que no revela su valor.
import { createHash } from 'node:crypto'

export default async () => {
  const key = process.env.DEMO_API_KEY

  const body = {
    configurada: Boolean(key),
    huella: key ? createHash('sha256').update(key).digest('hex').slice(0, 8) : null,
    contexto: process.env.CONTEXT || 'desconocido', // production | deploy-preview | branch-deploy
  }

  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
  })
}
