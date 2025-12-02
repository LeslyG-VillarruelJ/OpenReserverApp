
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import { tokenService } from "../services/token.service";
import { useAuthStore } from "../store/auth.store";

export class HttpClient {
    private client: AxiosInstance;

    constructor() {
        const BASE_URL = Constants.expoConfig?.extra?.apiUrl;

        this.client = axios.create({
            baseURL: BASE_URL,
            timeout: 20000,
            validateStatus: (s) => s >= 200 && s < 300,
        });

        this.setInterceptors();
    }

    private setInterceptors() {
        // REQUEST
        this.client.interceptors.request.use(async (config) => {
            const token = await tokenService.getAccessToken();

            if (token) {
                config.headers = Object.assign(config.headers || {}, {
                    Authorization: `Bearer ${token}`,
                });
            }

            // si es FormData → axios genera el boundary
            if (config.data instanceof FormData) {
                delete config.headers["Content-Type"];
            }

            return config;
        });

        // RESPONSE
        this.client.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                const original = error.config as AxiosRequestConfig & { _retry?: boolean };

                // 🔄 REFRESH TOKEN
                if (error.response?.status === 401 && !original._retry) {
                    original._retry = true;

                    try {
                        const newToken = await tokenService.refreshTokens();

                        if (!newToken) {
                            useAuthStore.getState().logout();
                            return Promise.reject(error);
                        }

                        original.headers = Object.assign(original.headers || {}, {
                            Authorization: `Bearer ${newToken}`,
                        });

                        return this.client(original);
                    } catch {
                        useAuthStore.getState().logout();
                        return Promise.reject(error);
                    }
                }

                // 🌀 Retry para servidores "dormidos" (Render)
                if ([502, 503, 504].includes(error.response?.status ?? 0)) {
                    await new Promise((res) => setTimeout(res, 1200));
                    return this.client(original);
                }

                return Promise.reject(error);
            }
        );
    }

    // Métodos CRUD limpios y tipados
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.client.get(url, config)
            .then((r) => r.data)
            .catch((err: AxiosError<any>) => {
                // Extraer mensaje de tu API
                const msg = err.response?.data?.message || err.message || "Error desconocido";
                return Promise.reject(new Error(msg));
            });
    }

    post<T>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.client.post(url, body, config)
            .then(r => r.data)
            .catch((err: AxiosError<any>) => {
                // Extraer mensaje de tu API
                const msg = err.response?.data?.message || err.message || "Error desconocido";
                return Promise.reject(new Error(msg));
            });
    }


    put<T>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.client.put(url, body, config)
            .then((r) => r.data)
            .catch((err: AxiosError<any>) => {
                // Extraer mensaje de tu API
                const msg = err.response?.data?.message || err.message || "Error desconocido";
                return Promise.reject(new Error(msg));
            });
    }

    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.client.delete(url, config)
            .then((r) => r.data)
            .catch((err: AxiosError<any>) => {
                // Extraer mensaje de tu API
                const msg = err.response?.data?.message || err.message || "Error desconocido";
                return Promise.reject(new Error(msg));
            });
    }
}

export const httpClient = new HttpClient();
