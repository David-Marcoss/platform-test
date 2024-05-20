import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { AxiosService } from './axios.service';

import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private axios: AxiosService) { }

  isAuthenticated: boolean = false;
  authToken: string | undefined;
  userLoggedId: number | undefined;

  apiUrl: string = environment.apiUrl;

  userAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getUserLoggedId(): number | undefined {
    return this.userLoggedId;
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

    try {
      await this.axios.post(this.apiUrl + "users/", user);
      return { success: true };

    }catch (error: any) {

      console.log(error);

      return { success: false};
    }
  }

  async login(user: User): Promise<{ success: boolean, error?: number }> {
    try {

      console.log(this.apiUrl)

      const req: any = await this.axios.post(this.apiUrl + "users/login", { email: user.email, password: user.password });

      this.setAuth(req.access_token, req.userId);

      return { success: true };

    } catch (error: any) {

      return { success: false };
    }
  }

  async getUser(): Promise<User | undefined>{

    try {
      const req: any = await this.axios.get(this.apiUrl + "users/" + this.userLoggedId);

      return req;

    } catch (error) {

      console.log(error)

      return undefined
    }
  }

  async update(data: User): Promise<{ success: boolean, error?: number, user?: User | any }> {
    try {
      const req = await this.axios.put(this.apiUrl + "users/" + this.userLoggedId, data);

      const user = req;

      return { success: true, user: req };

    } catch (error: any) {

      console.log(error);

      return { success: false};

    }

  }

  async resetPassword(data: any): Promise<{ success: boolean, error?: number}> {
    try {
      const req = await this.axios.post(this.apiUrl + "users/reset_password/" + this.userLoggedId, data);

      return { success: true};

    } catch (error: any) {

      console.log(error);

      return { success: false };

    }

  }

  async deleteUser(): Promise<{ success: boolean, error?: number }> {
    try {
      await this.axios.delete(this.apiUrl + "users/" + this.userLoggedId);

      this.logout();

      return { success: true };

    } catch (error: any) {

      console.log(error);


      return { success: false};

    }

  }

  async getUsers(): Promise<User[] | any> {
    try {
      const req = await this.axios.get(this.apiUrl + "users/");

      return req;

    } catch (error: any) {

      console.log(error);
      console.log(error.response.data);

      return [];

    }

  }

}
