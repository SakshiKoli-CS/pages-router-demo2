import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'

type Post = {
  id: number
  title: string
  body: string
  timestamp: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // No pre-rendered paths
    fallback: 'blocking', // Build on demand
  }
}

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({ params }) => {
  const id = params?.id as string

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`)
    if (!res.ok) throw new Error('Failed to fetch')

    const post = await res.json()

    return {
      props: { post },
      revalidate: 40, // ✅ Cached on CDN for 40s
    }
  } catch (err) {
    return { notFound: true }
  }
}

export default function PostODR({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial', padding: '2rem' }}>
      <h1>📘 Post #{post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <hr />
      <p><strong>Timestamp:</strong> {post.timestamp}</p>
    </div>
  )
}
