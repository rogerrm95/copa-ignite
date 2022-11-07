import { VStack, Text, useToast } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";

// Images & Icons //
import Logo from '../../assets/logo.svg';
import { Button } from "../../components/Button";

// Components //
import { Header } from "../../components/Header";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input/Input";
import { api } from "../../services/api";

export function New() {
    const [poolName, setPoolName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()

    async function handlePoolCreate() {
        if (!poolName || poolName.trim().length < 3) {
            return toast.show({
                title: 'Informe um nome para o bolão. Min: 3',
                placement: 'top',
                bgColor: 'red.500'
            })
        }

        try {
            setIsLoading(true)

            await api.post('/pools', {
                title: poolName
            }).then(_ => {
                setPoolName('')
            })

            return toast.show({
                title: 'Bolão criado com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            })

        } catch (error) {
            console.log(error)

            toast.show({
                title: 'Não foi possível criar o bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <VStack flex={1} bgColor='gray.900'>
            <Header title="Criar novo bolão" />

            <VStack marginTop={8} mx={5} alignItems="center">
                <Logo />

                <Heading
                    title={`Crie seu próprio bolão da copa e ${"\n"} compartilhe entre amigos!`}
                    color='white'
                    fontSize='xl'
                    fontWeight="bold"
                    my={8}
                    textAlign="center"
                />

                <Input
                    marginBottom={2}
                    placeholder="Qual o nome do seu bolão?"
                    value={poolName}
                    onChangeText={setPoolName}
                />

                <Button.Root
                    onPress={handlePoolCreate}
                    isDisabled={!poolName}
                    isLoading={isLoading}
                    _loading={{ _spinner: { color: 'black' } }}
                >
                    <Button.Text label="Criar meu bolão" />
                </Button.Root>

                <Text color='gray.200' textAlign='center' fontSize='sm' px={10} mt={4}>
                    Após criar seu bolão, você receberá um código único
                    que poderá usar para convidar outras pessoas.
                </Text>
            </VStack>
        </VStack>
    )
}