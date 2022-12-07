import { UserDTO } from "@dtos/UserDTO";
import { createContext } from "react";

export type AuthContextDataProps = {
    user: UserDTO;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

