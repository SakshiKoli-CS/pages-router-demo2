import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { GetStaticProps } from 'next'

type Movie = {
  Title: string
  Year: string
  Runtime: string
  Poster?: string
}

type HomeProps = {
  movies: Movie[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const res = await fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies')
  const movies: Movie[] = await res.json()

  return {
    props: {
      movies,
    },
  }
}

export default function Home({ movies }: HomeProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Oswald</h1>

      <div className={styles.imageWrapper}>
        <Image
          src="/OswaldCartoon.webp"
          alt="Oswald"
          width={300}
          height={450}
          className={styles.image}
        />
      </div>

      <p className={styles.caption}>My Favorite Childhood Cartoon ❤️</p>

      <h2 className={styles.subheading}>Movie List</h2>
      <div className={styles.moviesGrid}>
        {movies.map((movie, index) => (
          <div key={index} className={styles.movieCard}>
            {movie.Poster ? (
              <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
            ) : (
              <div className={styles.noPoster}>No Image</div>
            )}
            <h3>{movie.Title}</h3>
            <p>{movie.Year} • {movie.Runtime}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
