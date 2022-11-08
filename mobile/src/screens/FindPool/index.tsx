import { useNavigation } from "@react-navigation/native";
import { useToast, VStack } from "native-base";
import { useState } from "react";

// Images & Icons //
import { Button } from "../../components/Button";

// Components //
import { Header } from "../../components/Header";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input/Input";
import { api } from "../../services/api";

export function FindPool() {
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState('')

    const { navigate } = useNavigation()
    const toast = useToast()

    async function handleJoinPool() {
        try {
            setIsLoading(true)

            if (!code.trim()) {
                return toast.show({
                    title: 'Informar o código do bolão',
                    placement: 'top',
                    color: "black",
                    bgColor: 'yellow.700',
                })
            }

            await api.post('/pools/join', { code }).then(_ => setIsLoading(false))

            setCode('')
            navigate('pools')

            return toast.show({
                title: 'você entrou no bolão com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            })

        } catch (error) {
            console.log(error)
            setIsLoading(false)

            if (error.response?.data?.message === 'Bolão não encontrado') {
                return toast.show({
                    title: error.response.data.message,
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            if (error.response?.data?.message === 'Usuário já participando do bolão.') {
                return toast.show({
                    title: error.response.data.message,
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            toast.show({
                title: 'Não foi possível encontrar o bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
           //ATENÇÃO//
           // setIsLoading(false) - REMOVIDO //
           // PODE GERAR UM ERRO / ALERTA AO REALIZAR UMA TRANSIÇÃO DE TELA //
        }
    }

    return (
        <VStack flex={1} bgColor='gray.900'>
            <Header title="Criar novo bolão" showBackButton />

            <VStack marginTop={8} mx={5} alignItems="center">

                <Heading
                    title={`Encontre um bolão através de${"\n"}seu código único`}
                    color='white'
                    fontSize='xl'
                    fontWeight="bold"
                    marginBottom={8}
                    textAlign="center"
                />

                <Input
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    autoCapitalize="characters"
                    value={code}
                    onChangeText={setCode} />

                <Button.Root onPress={handleJoinPool} isLoading={isLoading}>
                    <Button.Text label="Buscar bolão" />
                </Button.Root>
            </VStack>
        </VStack>
    )
}