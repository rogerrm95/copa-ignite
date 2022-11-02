import Head from 'next/head'
import { api } from '../services/api'

interface HomeProps {
  count: number
}

export default function Home({ count }: HomeProps) {

  return (
    <div>
      <h1>Hello</h1>

      <p>Quantidade de bolões: {count}</p>
    </div>
  )
}

// Camada de Servidor focada em contrução da interface //
export const getServerSideProps = async () => {
  const response = await api.get('/pools/count').then(res => res.data)

  console.log(response)

  return {
    props: {
      count: response.count
    }
  }
}