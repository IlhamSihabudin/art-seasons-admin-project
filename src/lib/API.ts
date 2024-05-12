// import { ErrorRes } from '@/types/API'
import axiosInstance from '@/utils/axiosInstance';
import { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

// export const LOGOUT_REDIRECT = "/";
export const LOGOUT_REDIRECT = "https://artseasons.my.id/";

interface ReqeustHeaders {
  Accept: 'text/html' | 'text/plain' | 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded' | 'application/octet-stream';
  "Content-Type": 'text/html' | 'text/plain' | 'multipart/form-data' | 'application/json' | 'application/x-www-form-urlencoded' | 'application/octet-stream';
}

class api {
  private accessToken: string | undefined

  constructor() {
    this.accessToken = Cookies.get('access-token-admin')
  }

  async request(path: string, options?: AxiosRequestConfig, headers?: ReqeustHeaders) {
    const requestOptions = {
      headers: {
        ...headers,
        'Authorization': `Bearer ${this.accessToken}`
      },
      ...options
    }

    try {
      // const response = await axios({
      //   url: BASE_API_URL + path,
      //   ...requestOptions
      // })
      const response = await axiosInstance({
        url: path,
        ...requestOptions
      })

      const res = await response.data;

      if (res.error === true) {
        return Promise.reject(res)
      }

      return res
    } catch (error: unknown) {
      if (error instanceof Error) {
        return Promise.reject({
          ...error,
          message: error.message || 'Something went wrong!'
        })
      }
    }
  }

  get<R>(path: string, options?: AxiosRequestConfig, headers?: ReqeustHeaders): Promise<R> {
    return this.request(path, {
      method: 'GET',
      ...options
    }, headers);
  }

  delete(path: string) {
    return this.request(path, {
      method: 'DELETE'
    })
  }

  post<P, R = undefined>(path: string, body: P, headers?: ReqeustHeaders): Promise<R> {
    return this.request(path, {
      method: 'POST',
      data: body as P
    }, headers)
  }
}

export const API = new api()
