type Post = {
  id: number
  title: string
  body: string
  timestamp: string
}

// lib/fetchPost.ts
export async function fetchPostWithTimestamp(id: string | number ) : Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch post ${id}`)
  }

  const post = await res.json()

  return {
    ...post,
    timestamp: new Date().toISOString(),
  }
}
