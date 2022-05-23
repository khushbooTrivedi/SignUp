import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  public get userValue(): User {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
  }

  public setUserValue(user: User) {
    if (user) {
      let userList = localStorage.getItem('users')
        ? JSON.parse(localStorage.getItem('users'))
        : [];
      // if (!userList) userList = [];
      userList.push(user);
      localStorage.setItem('users', JSON.stringify(userList));
    }
  }

  signUp(user: User) {
    this.setUserValue(user);
    return this.http.post<User>('https://demo-api.now.sh/users', user);
  }

  login(user: User) {
    return this.http.post(`${environment.apiUrl}/login`, user);
  }

  logout(user: User = this.userValue) {
    return this.http.post(`${environment.apiUrl}/logout`, user);
  }
}
