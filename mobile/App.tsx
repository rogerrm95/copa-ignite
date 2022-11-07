import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { AuthContextProvider } from "./src/contexts/AuthContext";

// THEME //
import { THEME } from './src/styles/theme';

// Components //
import { Loading } from './src/components/Loading';

// Rotas //
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor='transparent'
          translucent
        />

        {
          !fontsLoaded ? <Loading /> : <Routes />
        }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}