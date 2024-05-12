import { API, LOGOUT_REDIRECT } from "@/lib/API";
import { ResponseApi } from "@/types/API";
import Cookies from "js-cookie";
import { createContext, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;

interface UpdateTokenResponse {
    access_token: string;
    expired_at: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const getToken = Cookies.get('access-token-admin')
    const navigateTo = useNavigate();

    const [authTokens, setAuthTokens] = useState(getToken ? getToken : null)
    const [loading, setLoading] = useState(true)
    

    const logout = useCallback(async () => {
        await Cookies.remove('access-token-admin');
        window.location.href = LOGOUT_REDIRECT;
    }, []);

    const updateToken = useCallback(async () => {
        const response = await API.get<ResponseApi<UpdateTokenResponse>>('/refresh-token');

        if (!response.success) {
            logout()
        }

        const token = await response.data;
        setAuthTokens(token.access_token)
        Cookies.set('access-token-admin', token.access_token)

        if (loading) setLoading(false)
    }, [loading, logout]);

    const contextData = {
        authTokens, 
        logout: logout
    }

    useEffect(() => {
        if (!authTokens) {
            window.location.href = LOGOUT_REDIRECT;
        }
        // // if (loading) updateToken()

        // const twoHours = 1000 * 60 * 120

        // const interval = setInterval(() => {
        //     if (authTokens) {
        //         updateToken()
        //     }
        // }, twoHours)
        // return () => clearInterval(interval)

        setLoading(false)
    }, [authTokens, loading, updateToken, navigateTo])

    return (
        <AuthContext.Provider value={contextData} >
            { loading ? null : children }
        </AuthContext.Provider>
    )
}