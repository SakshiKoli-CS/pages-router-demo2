import type { NextApiRequest, NextApiResponse } from 'next'
import { Stack } from '../../lib/contentstack'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await Stack.ContentType('Song').Query().toJSON().find()
    const entry = result[0][0]

    return res.status(200).json({
      title: entry?.title || 'No title found',
    })
  } catch (err) {
    console.error('Error fetching song entry:', err)
    return res.status(500).json({ title: 'Error fetching title' })
  }
}
