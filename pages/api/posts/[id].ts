// pages/api/posts/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  // Validate ID
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid post ID' })
  }

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Post not found' })
    }

    const post = await response.json()

    const postWithTimestamp = {
      ...post,
      timestamp: new Date().toISOString(),
    }

    res.status(200).json(postWithTimestamp)
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}
