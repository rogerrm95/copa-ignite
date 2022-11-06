import { VStack, Text, Icon } from "native-base";

// Icons //
import Octicons from '@expo/vector-icons/Octicons';

// Components //
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

export function Pools() {
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />

            <VStack marginTop={6} mx={5} borderBottomWidth={1} borderBottomColor='gray.600' pb={4} mb={4}>
                <Button.Root
                    leftIcon={<Icon as={Octicons}
                        name="search"
                        color='black'
                        size="md" />}>
                    <Button.Text label="Buscar bolão por código" />
                </Button.Root>

            </VStack>

            <Text px={10} color="gray.500" textAlign="center">
                Você ainda não está participando de nenhum bolão, que tal
                buscar um por código ou criar um novo?
            </Text>
        </VStack>
    )
}