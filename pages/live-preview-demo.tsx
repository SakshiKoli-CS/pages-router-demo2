import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { Stack } from '../lib/contentstack'
import ContentstackLivePreview from '@contentstack/live-preview-utils'

type Props = {
  initialTitle: string
}

export default function LivePreviewDemo({ initialTitle }: Props) {
  const [title, setTitle] = useState(initialTitle)

  useEffect(() => {
    ContentstackLivePreview.onEntryChange(() => {
      fetch('/api/song') // ✅ updated
        .then((res) => res.json())
        .then((data) => {
          if (data?.title) {
            setTitle(data.title)
          }
        })
    })
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🎶 Live Preview Demo</h1>
      <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>{title}</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const result = await Stack.ContentType('Song').Query().toJSON().find()
    const entry = result[0][0]

    return {
      props: {
        initialTitle: entry?.title || 'No song title found.',
      },
      revalidate: 10,
    }
  } catch (err) {
    console.error('Error in getStaticProps:', err)
    return {
      props: {
        initialTitle: 'Error loading title.',
      },
      revalidate: 10,
    }
  }
}
