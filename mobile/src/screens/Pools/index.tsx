import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, Icon, FlatList, useToast } from "native-base";
import { api } from "../../services/api";

// Icons //
import Octicons from '@expo/vector-icons/Octicons';

// Components //
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { PoolCard, PoolCardProps } from "../../components/PoolCard";
import { Loading } from "../../components/Loading";
import { EmptyPoolList } from "../../components/EmptyPoolList";

export function Pools() {
    const [isLoading, setIsLoading] = useState(false)
    const [pools, setPools] = useState<PoolCardProps[]>([])

    const { navigate } = useNavigation()
    const toast = useToast()

    async function fetchPools() {
        try {
            setIsLoading(true)

            const response = await api.get('/pools')

            setPools(response.data.pools)

        } catch (error) {
            console.log(error)

            return toast.show({
                title: 'Não foi possível carregar a lista de bolões',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPools()
    }, [])

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />

            <VStack marginTop={6} mx={5} borderBottomWidth={1} borderBottomColor='gray.600' pb={4} mb={4}>
                <Button.Root
                    leftIcon={<Icon as={Octicons}
                        name="search"
                        color='black'
                        size="md" />}
                    onPress={() => navigate('find')}
                >
                    <Button.Text label="Buscar bolão por código" />
                </Button.Root>
            </VStack>

            <FlatList
                data={pools}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <PoolCard data={item} />}
                px={5}
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ pb: 10 }}
                ListEmptyComponent={() => <EmptyPoolList />}
            />
        </VStack>
    )
}