import { GetStaticPaths, GetStaticProps } from 'next'

type Post = {
  id: number
  title: string
  body: string
  timestamp: string
}

type Props = {
  post: Post
}

export default function PostWithODR({ post }: Props) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📘 Post #{post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <hr />
      <p><strong>Timestamp:</strong> {post.timestamp}</p>
    </div>
  )
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
  const id = context.params?.id as string

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${id}`)
  const post = await res.json()

  return {
    props: { post },
    revalidate: 40, // ⏱️ Cache for 40 seconds
  }
}
