import { useEffect, useState } from "react";
import { Share } from "react-native";
import { HStack, useToast, VStack } from "native-base";
import { useRoute } from '@react-navigation/native'
import { api } from "../../services/api";
// Types //
import { PoolCardProps } from "../../components/PoolCard";

// Components //
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { PoolHeader } from "../../components/PoolHeader";
import { EmptyMyPoolList } from "../../components/EmptyMyPoolList";
import { Option } from "../../components/Option";
import { Guesses } from "../../components/Guesses";

interface RouteParams {
    id: string
}

export function Details() {
    const [isLoading, setIsLoading] = useState(false)
    const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">("guesses")
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps)

    const toast = useToast()
    const route = useRoute()
    const { id } = route.params as RouteParams

    async function fetchPoolDetails() {
        try {
            setIsLoading(true)

            const response = await api.get(`/pools/${id}`)

            setPoolDetails(response.data.pool)

        } catch (error) {
            console.log(error)

            return toast.show({
                title: 'Não foi possível carregar o bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCodeShare() {
        await Share.share({
            message: poolDetails.code
        })
    }

    // Carregar os detalhes do bolão //
    useEffect(() => {
        fetchPoolDetails()
    }, [id])

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bgColor='gray.900'>
            <Header title={poolDetails.title} showBackButton showShareButton onShare={handleCodeShare} />

            {
                poolDetails._count?.participants > 0 ?
                    (
                        <VStack px={5} flex={1}>
                            <PoolHeader data={poolDetails} />

                            <HStack bgColor="gray.800" rounded='sm' p={1} mb={5}>

                                <Option
                                    title="Seus Palpites"
                                    isSelected={optionSelected === 'guesses'}
                                    onPress={() => setOptionSelected('guesses')} />

                                <Option
                                    title="Ranking do grupo"
                                    isSelected={optionSelected === 'ranking'}
                                    onPress={() => setOptionSelected('ranking')} />

                            </HStack>

                            <Guesses poolId={poolDetails.id} code={poolDetails.code} />
                            
                        </VStack>
                    )
                    : (
                        <EmptyMyPoolList code={poolDetails.code} />
                    )
            }

        </VStack>
    )
}