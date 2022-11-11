import { FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { EmptyMyPoolList } from '../EmptyMyPoolList';

// Types //
import { Game, GameProps } from '../Game';
import { Loading } from '../Loading';

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([])

  const [firstTeamPoints, setFirstTeamPoints] = useState('0')
  const [secondTeamPoints, setSecondTeamPoints] = useState('0')

  const toast = useToast()

  async function fetchGames() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pools/${poolId}/games`)

      setGames(response.data.games)

    } catch (error) {
      console.log(error)

      return toast.show({
        title: 'Não foi possível carregar os jogos',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleConfirmGuess(gameId: string) {
    try {
      setIsLoading(true)

      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Informe o placar do jogo',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

      toast.show({
        title: 'Palpite registrado',
        placement: 'top',
        bgColor: 'green.500'
      })

      fetchGames()

    } catch (error) {
      return toast.show({
        title: error?.response.data.message,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleConfirmGuess(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
    />
  );
}
