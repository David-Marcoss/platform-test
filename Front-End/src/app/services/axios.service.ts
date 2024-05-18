import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
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
