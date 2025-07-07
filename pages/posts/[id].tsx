// pages/posts/[id].tsx
import { GetStaticPaths, GetStaticProps } from 'next'
import { fetchPostWithTimestamp } from '../../lib/fetchPost'

type Post = {
  id: number
  title: string
  body: string
  timestamp: string
}

type Props = {
  post: Post
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [1, 2, 3, 4, 5].map(id => ({
    params: { id: id.toString() },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { id } = context.params!

  try {
    const post = await fetchPostWithTimestamp(id as string)
    return {
      props: { post },
      revalidate: 10,
    }
  } catch {
    return { notFound: true }
  }
}

export default function PostPage({ post }: Props) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📝 Post #{post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <hr />
      <p><strong>Timestamp:</strong> {post.timestamp}</p>
    </div>
  )
}
