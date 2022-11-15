import { createContext, ReactNode, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { api } from "../services/api";

// STORAGE //
import { useAsyncStorage } from '@react-native-async-storage/async-storage'

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

    const { getItem, setItem } = useAsyncStorage("@copa-nlw:profile")

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

            // SALVANDO O TOKEN NO STORAGE //
            await setItem(tokenResponse.data.token)

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

    async function getUserInAsyncStorage() {
        try {
            setIsUserLoading(true)

            const token = await getItem()

            if(!token) {
                return 
            }

            // ARMAZENANDO O TOKEN NOS HEADERS //
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            // BUSCAR USUÁRIO //
            await api.get('/me').then(res => {
                setUser({
                    name: res.data.user.name,
                    avatarUrl: res.data.user.avatar
                })
            })

        } catch (error) {
            return api.defaults.headers.common["Authorization"] = ""
        } finally {
            setIsUserLoading(false)
        }
    }

    // VERIFICARÁ SE O USUÁRIO JA ESTÁ LOGADO //
    useEffect(() => {
        getUserInAsyncStorage()
    }, [])

    // OBSERVAR QUANDO HOUVER UMA RESPOSTA DE AUTENTICAÇÃO PRONTA // 
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
