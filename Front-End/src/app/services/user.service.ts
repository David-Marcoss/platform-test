import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private axios: AxiosService) { }

  users: User[] | undefined;
  isAuthenticated: boolean = false
  authToken: string | undefined

  isAutehnticated(){
    return this.isAutehnticated
  }

  setAuth(token: string){
    this.authToken = token
    this.isAuthenticated = true
  }

  logout(){
    this.authToken = undefined
    this.isAuthenticated = false
  }

  async create(user : User){

    const url = "http://localhost:5000/"
    try {

      await this.axios.post(url + "users/", user)

      return {sucsess: true}

    } catch (error: any) {

      return {sucsess: false, error: error.response.data}
    }

  }

  async login(user : User){

    const url = "http://localhost:5000/"

    try {

      const req: any = await this.axios.post(url + "users/login", {email: user.email, password: user.password})

      this.setAuth(req.data.access_token)

      return {sucsess: true}

    } catch (error: any) {
      const msg = error.response.data || "Erro ao logar"

      return {sucsess: false, error: msg}
    }

  }

}
