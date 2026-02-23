import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
private API = environment.apiUrl + '/api/auth';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.API}/register`, data, {
      withCredentials: true
    });
  }

  login(data: any) {
    return this.http.post(`${this.API}/login`, data, {
      withCredentials: true
    });
  }

  logout() {
    return this.http.post(`${this.API}/logout`, {}, {
      withCredentials: true
    });
  }

  checkAuth() {
    return this.http.get(`${this.API}/me`, {
      withCredentials: true
    });
  }
}