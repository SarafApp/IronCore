import { Axios, InternalAxiosRequestConfig } from "axios";

export class HttpClient {
  private axiosInstance: Axios;

  constructor(instance: Axios) {
    this.axiosInstance = instance;
  }

  public async get<T>(
    url: string,
    config?: InternalAxiosRequestConfig,
  ): Promise<T | undefined> {
    return await this.axiosInstance.get(url, config);
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig,
  ): Promise<T | undefined> {
    return await this.axiosInstance.post(url, data, config);
  }

  public async patch<T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig,
  ): Promise<T | undefined> {
    return await this.axiosInstance.patch(url, data, config);
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig,
  ): Promise<T | undefined> {
    return await this.axiosInstance.put(url, data, config);
  }

  public async delete<T>(
    url: string,
    config?: InternalAxiosRequestConfig,
  ): Promise<T | undefined> {
    return await this.axiosInstance.delete(url, config);
  }
}

export default HttpClient;
