import axios from "axios";
import dayjs from 'dayjs';
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

// const BASE_API_URL = 'http://127.0.0.1:8000/api';
const BASE_API_URL = 'https://api.artseasons.my.id/api';

let authTokens = Cookies.get('access-token-admin')

interface JWTToken {
    iss: string;
    iat: number;
    exp: number;
    nbf: number;
    jti: string;
    sub: string;
    prv: string;
}

const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        Authorization: `Bearer ${authTokens}`
    }
})

axiosInstance.interceptors.request.use(async req => {
    if (!authTokens) {
        authTokens = Cookies.get('access-token-admin')
        req.headers.Authorization = `Bearer ${authTokens}`
    }

    const decode: JWTToken = jwtDecode(authTokens)
    const isExpired = dayjs.unix(decode.exp).diff(dayjs()) < 1;
    if (!isExpired) return req

    const response = await axios.get(`${BASE_API_URL}/refresh-token`, {
        headers: {
            Authorization: `Bearer ${authTokens}`
        }
    })

    const token = await response.data;
    Cookies.set('access-token-admin', token.data.access_token)
    req.headers.Authorization = `Bearer ${token.data.access_token}`

    return req
})

export default axiosInstance;