import { useTheme, Box } from 'native-base'
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from './app.routes';


export function Routes() {

    const { colors } = useTheme();

    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    //Coloco esse Box porque na transição de uma tela para outra pode haver um flash branco

    return (
        <Box flex={1} bg="gray.700">
            <NavigationContainer theme={theme}>
                <AuthRoutes />
                {/* <AppRoutes /> */}
            </NavigationContainer>
        </Box>
    )
}