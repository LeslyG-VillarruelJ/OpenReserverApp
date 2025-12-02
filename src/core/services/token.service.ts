import * as SecureStore from "expo-secure-store";
import { httpClient } from "../http/http-client";

const ACCESS = "access_token";
const REFRESH = "refresh_token";

export const tokenService = {
  async getAccessToken() {
    return SecureStore.getItemAsync(ACCESS);
  },

  async saveTokens(access: string, refresh: string) {
    await SecureStore.setItemAsync(ACCESS, access);
    await SecureStore.setItemAsync(REFRESH, refresh);
  },

  async removeTokens() {
    await SecureStore.deleteItemAsync(ACCESS);
    await SecureStore.deleteItemAsync(REFRESH);
  },

  async refreshTokens() {
    const refreshToken = await SecureStore.getItemAsync(REFRESH);
    if (!refreshToken) return null;

    try {
      const resp = await httpClient.post<{
        accessToken: string;
        refreshToken: string;
      }>("/auth/refresh", { refreshToken });

      await tokenService.saveTokens(resp.accessToken, resp.refreshToken);

      return resp.accessToken;
    } catch {
      return null;
    }
  },
};
