import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private axios: AxiosService) { }

  isAuthenticated: boolean = false;
  authToken: string | undefined;
  userLoggedId: number | undefined;

  userAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  setAuth(token: string, userLoggedId: number): void {
    this.authToken = token;
    this.isAuthenticated = true;
    this.userLoggedId = userLoggedId

    this.axios.setAuthToken(token);

    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userLoggedId", userLoggedId.toString())
  }

  getAuthLocals(): void {
    const token = localStorage.getItem('token');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userLoggedId = localStorage.getItem("userLoggedId")

    if (token && isAuthenticated && userLoggedId) {
      this.authToken = token;
      this.isAuthenticated = true;
      this.userLoggedId = parseInt(userLoggedId);

      this.axios.setAuthToken(token);

    }else{
      this.logout();
    }

  }

  logout(): void {
    this.authToken = undefined;
    this.isAuthenticated = false;

    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");

    this.axios.setAuthToken("");
  }

  async create(user: User): Promise<{ success: boolean, error?: number }> {
    const url = "http://localhost:5000/";
    try {
      await this.axios.post(url + "users/", user);
      return { success: true };
    } catch (error: any) {
      console.log(error);
      return { success: false, error: error.response.status };
    }
  }

  async login(user: User): Promise<{ success: boolean, error?: number }> {
    const url = "http://localhost:5000/";
    try {

      const req: any = await this.axios.post(url + "users/login", { email: user.email, password: user.password });

      this.setAuth(req.access_token, req.userId);

      return { success: true };

    } catch (error: any) {

      return { success: false, error: error.response.status };
    }
  }

  async getUser(): Promise<User | undefined>{
    const url = "http://localhost:5000/";

    try {
      const req: any = await this.axios.get(url + "users/" + this.userLoggedId);

      return req;

    } catch (error) {

      console.log(error)

      return undefined
    }
  }

  async update(data: User): Promise<{ success: boolean, error?: number, user?: User | any }> {
    const url = "http://localhost:5000/";
    try {
      const req = await this.axios.put(url + "users/" + this.userLoggedId, data);

      const user = req;

      return { success: true, user: req };

    } catch (error: any) {

      console.log(error);
      console.log(error.response.data);

      return { success: false, error: error.response.status };

    }

  }

  async resetPassword(data: any): Promise<{ success: boolean, error?: number}> {
    const url = "http://localhost:5000/";
    try {
      const req = await this.axios.post(url + "users/reset_password/" + this.userLoggedId, data);

      return { success: true};

    } catch (error: any) {

      console.log(error);
      console.log(error.response.data);

      return { success: false, error: error.response.status };

    }

  }

  async deleteUser(): Promise<{ success: boolean, error?: number }> {
    const url = "http://localhost:5000/";
    try {
      await this.axios.delete(url + "users/" + this.userLoggedId);

      this.logout();

      return { success: true };

    } catch (error: any) {

      console.log(error);
      console.log(error.response.data);

      return { success: false, error: error.response.status };

    }

  }

  async getUsers(): Promise<User[] | any> {
    const url = "http://localhost:5000/";
    try {
      const req = await this.axios.get(url + "users/");

      return req;

    } catch (error: any) {

      console.log(error);
      console.log(error.response.data);

      return [];

    }

  }

}
