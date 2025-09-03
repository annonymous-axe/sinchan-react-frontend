import { createContext, useContext, useState, useEffect } from "react";
import loginApi from "./../api/authApi";
import { apiClient } from "../api/apiClient";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [token, setToken] = useState(sessionStorage.getItem("authToken"));
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("isAuthenticated"));

    async function login(userCred) {
        return await loginApi(userCred).then((response) => {
            if (response.status === 200) {
                const authToken = "Bearer " + response.data;

                // Save in state
                setToken(authToken);
                setIsAuthenticated(true);

                sessionStorage.setItem("authToken", authToken);
                sessionStorage.setItem("isAuthenticated", isAuthenticated);

                // Set axios header
                apiClient.interceptors.request.use((config) => {
                    config.headers.Authorization = authToken;
                    return config;
                });

                return true;
            }
            return false;
        });
    }

    function logout() {
        setToken(null);
        setIsAuthenticated(false);
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("isAuthenticated");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
