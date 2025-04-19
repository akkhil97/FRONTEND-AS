import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserLog {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private currentUsername = 'admin';

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }

  getCurrentUsername(): string {
    return this.currentUsername;
  }

  setCurrentUsername(username: string) {
    this.currentUsername = username;
  }

  updateCredentials(username: string, password: string): Observable<any> {
    const userData: UserLog = { username, password };
    return this.http.put('http://localhost:8080/api/updateUser', userData, { responseType: 'text' });
  }  
}
