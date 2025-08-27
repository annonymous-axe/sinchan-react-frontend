import { createContext, useContext, useState, useEffect } from "react";
import loginApi from "./../api/authApi";
import { apiClient } from "../api/apiClient";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));

    async function login(userCred) {
        return await loginApi(userCred).then((response) => {
            if (response.status === 200) {
                const authToken = "Bearer " + response.data;

                // Save in state
                setToken(authToken);
                setIsAuthenticated(true);

                localStorage.setItem("authToken", authToken);
                localStorage.setItem("isAuthenticated", isAuthenticated);

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
        localStorage.removeItem("authToken");
        localStorage.removeItem("isAuthenticated");
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
