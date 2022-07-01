import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: String, password: String) {
    const headers = { 'content-type': 'application/json'} 
    const b = {
        "username" : username,
        "password" : password
    } 
    const body=JSON.stringify(b);
    // console.log(body)
    return this.http.post('login', body,{'headers':headers})
  }

  // LOG OUT FUNCTION
  logout() {
    const headers = { 'content-type': 'application/json'} 
    return this.http.post('logout',{});
  }

  register(first_name: String, last_name: String, username: String, password: String){
    const headers = { 'content-type': 'application/json'} 
    const b = {
      "first_name" : first_name,
      "last_name" : last_name,
      "email" : username,
      "password" : password,
      "admin" : false
    }
    const body = JSON.stringify(b)
    // console.log(body)
    return this.http.post('register', body, {'headers':headers})
  }

  createAdmin() {
    const headers = { 'content-type': 'application/json'} 
    const b = {
      "first_name" : "admin",
      "last_name" : "admin",
      "email" : "admin",
      "password" : "admin",
      "admin" : true
    }
    const body = JSON.stringify(b)
    // console.log(body)
    return this.http.post('register', b, {'headers': headers});
  }

  getUser(){
    return this.http.get(`final/api/v1/user`)
  }

  updateUser(uid:number, first: string, last: string, email: string){
    const headers = { 'content-type': 'application/json'} 
    const b = {
      "first_name" : first,
      "last_name" : last,
      "email" : email
    }
    const body = JSON.stringify(b)
    return this.http.put(`final/api/v1/users/${uid}/edit`, body, {'headers': headers})
  }

  getUsers(){
    return this.http.get('final/api/v1/users/admin')
  }

  toggleAdmin(user: User){
    const headers = { 'content-type': 'application/json'} 
    const admin = !user.admin
    const b = {
      "admin" : admin
    }
    const body = JSON.stringify(b)
    return this.http.put(`final/api/v1/users/${user._id}/admin`, body, {'headers':headers})
  }

  removeUser(user: User) {
    return this.http.delete(`final/api/v1/users/${user._id}/admin`)
  }
}
