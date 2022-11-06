import { createContext, ReactNode, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

interface User {
    name: string,
    avatarUrl: string
}

export interface AuthContextDataProps {
    user: User,
    isUserLoading: boolean
    signIn: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextDataProps)

interface AuthContextProviderProps {
    children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState({ avatarUrl: 'GitHub', name: 'Roger' } as User)
    const [isUserLoading, setIsUserLoading] = useState(false)

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '625499261393-o3loed2rb8ivpl7471aerugp563pi3pk.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })

    async function signWithGoogle(accessToken: string) {
        console.log(accessToken)
    }

    async function signIn() {
        try {
            setIsUserLoading(true)

            await promptAsync({})

        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setIsUserLoading(false)
        }
    }

    // OBSERVAR QUANDO HOUVER UMA RESPONSA DE AUTENTICAÇÃO PRONTA // 
    useEffect(() => {
        if (response?.type === 'success' && response.authentication?.accessToken) {
            signWithGoogle(response.authentication.accessToken)
        }
    }, [response])

    return (
        <AuthContext.Provider value={{ user, isUserLoading, signIn }}>
            {
                children
            }
        </AuthContext.Provider>
    )
}
