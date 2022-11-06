import { VStack, Text } from "native-base";

// Images & Icons //
import Logo from '../../assets/logo.svg';
import { Button } from "../../components/Button";

// Components //
import { Header } from "../../components/Header";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input/Input";

export function New() {
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

                <Input marginBottom={2} placeholder="Qual o nome do seu bolão?" />

                <Button.Root>
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