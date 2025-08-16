import { createContext, useContext, useState, useEffect } from "react";
import loginApi from "./../api/authApi";
import { apiClient } from "../api/apiClient";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Restore auth state on page reload
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);

            apiClient.interceptors.request.use((config) => {
                config.headers.Authorization = storedToken;
                return config;
            });
        }

        // changeLanguage('mr');
    }, []);

    // function changeLanguage(langCode) {
    //     axios.defaults.headers.common['Accept-Language'] = langCode;
    //     localStorage.setItem("lang", langCode); // remember user preference
    // }    

    async function login(userCred) {
        return await loginApi(userCred).then((response) => {
            if (response.status === 200) {
                const authToken = "Bearer " + response.data;

                // Save in state
                setToken(authToken);
                setIsAuthenticated(true);

                // Save in localStorage for persistence
                localStorage.setItem("authToken", authToken);

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
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
