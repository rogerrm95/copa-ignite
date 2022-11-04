import Head from 'next/head'
import Image from 'next/image'
import { api } from '../services/api'

// Images //
import AppPreviewImage from '../assets/app-nlw-copa-preview.png'
import UsersAvatarExample from '../assets/users-avatar-example.png'
import IconCheck from '../assets/icon-check.svg'
import LogoImage from '../assets/logo.svg'
import { FormEvent, useState } from 'react'
import { GetStaticProps } from 'next'

interface HomeProps {
  poolsCount: number,
  guessCount: number,
  usersCount: number
}

export default function Home({ poolsCount, guessCount, usersCount }: HomeProps) {

  const [poolTitle, setPoolTitle] = useState('')

  async function handleCreatePool(event: FormEvent) {
    event.preventDefault()

    try {
      if (!poolTitle) return alert('Informar uma nome para o bolão!')

      const response = await api.post('/pools', {
        title: poolTitle
      })

      const { code } = response.data
      await navigator.clipboard.writeText(code)

      alert('Bolão criado. Código copiado para a área de transferência!')

      setPoolTitle('')
    } catch (error) {
      alert("Falha ao criar o bolão")
    }
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={LogoImage} alt="NLW Copa" />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={UsersAvatarExample} alt="" quality={100} />


          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500 mr-2'>
              +{usersCount}
            </span>
            pessoas já estão usando
          </strong>
        </div>

        <form className='mt-10 flex gap-2' onSubmit={handleCreatePool}>
          <input
            className='flex-1 rounded px-6 py-4 bg-gray-800 border border-gray-600 text-sm text-gray-100'
            type="text"
            placeholder='Qual nome do seu bolão?'
            value={poolTitle}
            onChange={(event) => setPoolTitle(event.target.value)}
          />

          <button
            className='bg-yellow-500 rounded px-6 py-4 text-sm font-bold text-gray-900 uppercase hover:bg-yellow-700 transition-colors'>
            Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-gray-300 text-sm leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={IconCheck} alt="" />

            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{poolsCount}</span>
              <span>Bolões criados </span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600' />

          <div className='flex items-center gap-6'>
            <Image src={IconCheck} alt="" />

            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{guessCount}</span>
              <span>Palpites enviados </span>
            </div>
          </div>
        </div>
      </main >

      <Image src={AppPreviewImage} alt="Dois celulares com a aplicação rodando" quality={100} />
    </div >
  )
}

// // Camada de Servidor focada em contrução da interface //
// export const getServerSideProps = async () => {
//   // Utilizando Promise.all() para encadear as chamadas à API //
//   const [poolsCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
//     api.get('/pools/count').then(res => res.data),
//     api.get('/guesses/count').then(res => res.data),
//     api.get('/users/count').then(res => res.data)
//   ])

//   return {
//     props: {
//       poolsCount: poolsCountResponse.count,
//       guessCount: guessCountResponse.count,
//       usersCount: usersCountResponse.count
//     }
//   }
// }

// Camada de Servidor focada em contrução da interface //
export const getStaticProps: GetStaticProps = async (ctx) => {
  // Utilizando Promise.all() para encadear as chamadas à API //
  const [poolsCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
    api.get('/pools/count').then(res => res.data),
    api.get('/guesses/count').then(res => res.data),
    api.get('/users/count').then(res => res.data)
  ])

  console.log(ctx)

  return {
    props: {
      poolsCount: poolsCountResponse.count,
      guessCount: guessCountResponse.count,
      usersCount: usersCountResponse.count
    },
    revalidate: 3000 // Tempo para realizar uma nova atualização/chamada API em SEGUNDOS //
  }
}