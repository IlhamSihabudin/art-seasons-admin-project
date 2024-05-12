import { ErrorRes } from '@/types/API'

const BASE_API_URL = 'https://dummyjson.com'

class api {
  private token: string | undefined

  constructor() {
    this.token = localStorage.getItem('token') || ''
  }

  setToken(token: string) {
    this.token = token
    localStorage.setItem('token', token)
  }

  resetToken() {
    this.token = ''
    localStorage.removeItem('token')
  }

  async request(path: string, options?: RequestInit) {
    const requestOptions: RequestInit = {
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      },
      ...options
    }

    try {
      const response = await fetch(BASE_API_URL + path, requestOptions)

      if (!response.ok) {
        const error = (await response.json()) as ErrorRes
        if (response.status === 401) {
          localStorage.removeItem('user-state')
          window.location.reload()
        }
        return Promise.reject(error)
      }

      if (typeof options?.body === 'string' && options.method === 'POST' && JSON.parse(options.body).FOR_DOCUMENT) {
        return await response.arrayBuffer()
      }

      const res = await response.json()

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

  get<R>(path: string): Promise<R> {
    return this.request(path)
  }

  delete(path: string) {
    return this.request(path, {
      method: 'DELETE'
    })
  }

  post<P, R = undefined>(path: string, body: P): Promise<R> {
    return this.request(path, {
      method: 'POST',
      body: JSON.stringify(body as P)
    })
  }
}

export const API = new api()
