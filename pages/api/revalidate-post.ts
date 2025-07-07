import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, secret } = req.query

  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Invalid or missing id' })
  }

  try {
    await res.revalidate(`/posts-with-odr/${id}`)
    return res.json({ revalidated: true, id })
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating' })
  }
}
