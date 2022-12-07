import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [user, setUser] = useState({
        id: '1',
        name: 'João Andrade',
        email: 'joaovictorvieira.23@hotmail.com',
        avatar: 'joao.png'
    });

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
          </AuthContext.Provider>
    );
}