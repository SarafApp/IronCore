import { InternalAxiosRequestConfig } from "axios";

export interface Interceptor {
  intercept(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig;
}
