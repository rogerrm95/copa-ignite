import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform } from 'react-native'
import { useTheme } from 'native-base'

// Icons //
import { PlusCircle, SoccerBall } from 'phosphor-react-native'

// Screens //
import { New } from '../screens/NewPool'
import { Pools } from '../screens/Pools'
import { SignIn } from '../screens/SignIn'
import { FindPool } from '../screens/FindPool'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
    const { colors, sizes } = useTheme()

    const size = sizes[6] // Definir o tamanho dos ícones //

    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.yellow[500],
            tabBarInactiveTintColor: colors.gray[300],
            tabBarStyle: {
                position: 'absolute',
                height: sizes[22],
                borderTopWidth: 0,
                backgroundColor: colors.gray[800],
            },
            tabBarLabelPosition: 'beside-icon',
            tabBarItemStyle: {
                position: 'relative',
                top: Platform.OS === 'android' ? -10 : 0
            }
        }}>

            <Screen name='new'
                component={New}
                options={{
                    tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
                    tabBarLabel: 'Criar bolão'
                }} />

            <Screen name='pools'
                component={Pools}
                options={{
                    tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
                    tabBarLabel: 'Meus bolões'
                }} />

            <Screen name='find'
                component={FindPool}
                options={{ tabBarButton: () => null }} /> 

        </Navigator>
    )
}