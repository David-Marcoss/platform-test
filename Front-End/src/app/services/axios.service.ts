import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';


@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private axiosClient: AxiosInstance;

  private authToken: string | null = null;

  constructor() {

    this.axiosClient = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    //adiciona o token de autenticação na requisição
    this.axiosClient.interceptors.request.use(config => {
      if (this.authToken) {
        config.headers['Authorization'] = this.authToken;
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });

    //verifica se o token expirou
    this.axiosClient.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response && error.response.status === 401) {

          console.log("Token expirado");

          localStorage.removeItem("token");
          localStorage.removeItem("isAuthenticated");
        }

      }
    );

  }

  public setAuthToken(token: string): void {
    this.authToken = token;
  }

  public get<T>(url: string): Promise<T> {
    return this.axiosClient.get(url).then(response => response.data);
  }

  public post<T>(url: string, data: any): Promise<T> {
    return this.axiosClient.post(url, data).then(response => response.data);
  }

  public put<T>(url: string, data: any): Promise<T> {
    return this.axiosClient.put(url, data).then(response => response.data);
  }

  public delete<T>(url: string): Promise<T> {
    return this.axiosClient.delete(url).then(response => response.data);
  }
}
