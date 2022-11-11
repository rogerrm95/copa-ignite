import { ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';

// Datas //
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

// Components //
import { Team } from '../Team';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  date: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | GuessProps;
};

interface Props {
  data: GameProps;
  onGuessConfirm: () => Promise<void>;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
};

export function Game({ data, setFirstTeamPoints, setSecondTeamPoints, onGuessConfirm }: Props) {
  const { colors, sizes } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleGuessConfirm() {
    try {
      setIsSubmitting(true)
      await onGuessConfirm()
    } catch (_) {

    } finally {
      setIsSubmitting(false)
    }
  }

  // Formatação das datas //
  const when = dayjs(data.date).locale(ptBr).format("DD [de] MMMM [de] YYYY [ás] HH:00")

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.firstTeamCountryCode)} vs. {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {when}
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
        />
      </HStack>

      {
        !data.guess &&
        <Button size="xs" w="full" bgColor="green.500" mt={4} onPress={handleGuessConfirm} disabled={isSubmitting}>
          <HStack alignItems="center">
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
                  CONFIRMAR PALPITE
                </Text>

                <Check color={colors.white} size={sizes[4]} />
              </>
            )}
          </HStack>
        </Button >
      }
    </VStack >
  );
}

// TODO //
// 1. Persistir os dados no Storage (Manter usuário logado) //
// 2. Traduzir os nomes das Seleções //
// 3. Exibir os resultados já salvos //
// 4. Estudar e implementar a funcionalidade de Ranking - Preparar o back-end antes //