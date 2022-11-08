import { useEffect, useState } from "react";
import { useToast, VStack } from "native-base";
import { useRoute } from '@react-navigation/native'
import { api } from "../../services/api";
// Types //
import { PoolCardProps } from "../../components/PoolCard";

// Components //
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";

interface RouteParams {
    id: string
}

export function Details() {
    const [isLoading, setIsLoading] = useState(false)
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps)

    const toast = useToast()
    const route = useRoute()
    const { id } = route.params as RouteParams

    async function fetchPoolDetails() {
        try {
            setIsLoading(true)

            const response = await api.get(`/pools/${id}`)

            console.log(response.data.pool)

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

    // Carregar os detalhes do bolão //
    useEffect(() => {
        fetchPoolDetails()
    }, [id])

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bgColor='gray.900'>
            <Header title={id} showBackButton showShareButton />

        </VStack>
    )
}