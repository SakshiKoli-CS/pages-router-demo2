import { GetServerSideProps } from 'next'

type Product = {
  id: number
  title: string
  description: string
  price: number
  images: string[]
  category: {
    id: number
    name: string
    image: string
  }
  randomNum: number
}

type Props = {
  product: Product
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await fetch('https://api.escuelajs.co/api/v1/products')
  const allProducts = await res.json()

  const randomIndex = Math.floor(Math.random() * allProducts.length)
  const selectedProduct = allProducts[randomIndex]

  const product: Product = {
    ...selectedProduct,
    randomNum: Math.floor(Math.random() * 1000) + 1,
  }

  return {
    props: {
      product,
    },
  }
}

export default function ShuffleProducts({ product }: Props) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>🎲 Random Product</h1>

      <div style={{
        margin: '2rem auto',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '2px solid #ddd',
        backgroundColor: '#fff',
        maxWidth: '450px'
      }}>
        <img
          src={product.images[0]}
          alt={product.title}
          style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }}
        />
        <h2 style={{ marginTop: '1rem' }}>{product.title}</h2>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Category:</strong> {product.category.name}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Random Number:</strong> {product.randomNum}</p>
      </div>
    </div>
  )
}
