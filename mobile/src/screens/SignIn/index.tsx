import { Center, Icon, Text } from 'native-base';

// Hook //
import { useAuth } from '../../hooks/useAuth';

// Images & Icons //
import Logo from '../../assets/logo.svg';
import Fontisto from '@expo/vector-icons/Fontisto';

// Components //
import { Button } from '../../components/Button';

export function SignIn() {
    const { isUserLoading, signIn } = useAuth()

    return (
        <Center flex={1} bgColor='gray.900' padding={7}>
            <Logo width={212} height={40} />

            <Button.Root
                types="SECONDARY"
                marginTop={12}
                leftIcon={<Icon as={Fontisto} name='google' color='white' size='md' />}
                onPress={signIn}
                isLoading={isUserLoading}
                _loading={{ _spinner: { color: 'white' } }}
            >
                <Button.Text types='SECONDARY' label='Entrar com google' />
            </Button.Root>

            <Text
                marginTop={4}
                color='gray.200'
                textAlign='center'>
                Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
            </Text>
        </Center>
    );
}