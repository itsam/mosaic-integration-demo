import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { getOidc } from "@/oidc";

const axiosInstance = axios.create({ baseURL: "" });

axiosInstance.interceptors.request.use(async (config) => {
  const oidc = await getOidc();
  const token = oidc.isUserLoggedIn ? oidc.getTokens().accessToken : undefined;
  if (token) {
    // Ensure headers are an instance of AxiosHeaders
    config.headers = new AxiosHeaders({
      ...config.headers, // Preserve existing headers
      Authorization: `Bearer ${token}`,
    });
  }
  return config;
});

export const customAxios = async <T>(
  config: AxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance.request<T>(config);
  return response.data;
};
