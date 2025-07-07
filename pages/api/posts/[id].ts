// pages/api/posts/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchPostWithTimestamp } from '../../../lib/fetchPost'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid post ID' })
  }

  try {
    const post = await fetchPostWithTimestamp(id as string)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ error: 'Post not found' })
  }
}
