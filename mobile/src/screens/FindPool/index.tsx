import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";

// Images & Icons //
import { Button } from "../../components/Button";

// Components //
import { Header } from "../../components/Header";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input/Input";

export function FindPool() {
    const { navigate } = useNavigation()

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

                <Input marginBottom={2} placeholder="Qual o código do bolão?" />

                <Button.Root onPress={() => navigate('find')}>
                    <Button.Text label="Buscar bolão" />
                </Button.Root>
            </VStack>
        </VStack>
    )
}