import { Axios, InternalAxiosRequestConfig } from "axios";
import { Interceptor } from "./Interceptor";
import { APIErrorHandlerRegistry } from "./ErrorHandlerRegistry";

export class ApiBuilder {
  private axiosInstance: Axios;

  constructor(axiosInstance: Axios) {
    this.axiosInstance = axiosInstance;
  }

  public setBaseURL(baseURL: string) {
    this.axiosInstance.defaults.baseURL = baseURL;
    return this;
  }

  public setTimeout(timeInMilliSeconds: number) {
    this.axiosInstance.defaults.timeout = timeInMilliSeconds;
    return this;
  }

  public setHeaders(headers: Record<string, string | string[]>) {
    this.axiosInstance.defaults.headers.common = headers;
    return this;
  }

  public attachRequestInterceptors(interceptors: Interceptor[]) {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        for (const interceptor of interceptors) {
          interceptor.intercept(config);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    return this;
  }

  public attachResponseInterceptors(apiErrorRegistry: APIErrorHandlerRegistry) {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        apiErrorRegistry.handle(error);
        return error;
      },
    );
    return this;
  }

  public build() {
    return this.axiosInstance;
  }
}
export default ApiBuilder;
