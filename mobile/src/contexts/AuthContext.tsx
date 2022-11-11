import { createContext, ReactNode, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { api } from "../services/api";

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
    const [user, setUser] = useState({} as User)
    const [isUserLoading, setIsUserLoading] = useState(false)

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: process.env.GOOGLE_CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })

    async function signWithGoogle(accessToken: string) {
        try {
            setIsUserLoading(true)

            // VALIDANDO O TOKEN //
            const tokenResponse = await api.post('/users', { accessToken })

            // ARMAZENANDO O TOKEN NOS HEADERS //
            api.defaults.headers.common["Authorization"] = `Bearer ${tokenResponse.data.token}`

            // BUSCAR USUÁRIO //
            await api.get('/me').then(res => {
                setUser({
                    name: res.data.user.name,
                    avatarUrl: res.data.user.avatar
                })
            })
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setIsUserLoading(false)
        }
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
