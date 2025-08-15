import { createContext, useContext, useState } from "react";
import loginApi from "./../api/authApi";
import { apiClient } from "../api/apiClient";

export const AuthContext = createContext();

export default function AuthProvider({ children }){

    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    async function login(userCred){

        return await loginApi(userCred).then(response => {

            if(response.status == 200){

                const authToken = "Bearer "+response.data;
                setToken(authToken);
                setIsAuthenticated(true);

                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = authToken
                        return config
                    }
                )

                return true;
            }

            return false;
        });
        

    }

    return(
        <AuthContext.Provider value = { { isAuthenticated, login } }>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);