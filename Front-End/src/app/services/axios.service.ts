import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

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

    this.axiosClient.interceptors.request.use(config => {
      if (this.authToken) {
        config.headers['Authorization'] = this.authToken;
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });

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
