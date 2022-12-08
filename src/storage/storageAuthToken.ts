import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from './storageConfig';

export async function storageAuthTokenSabe(token: string) {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
}