import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'https://localhost:44399/api/users';

  constructor(private http: HttpClient) { }

  login(username: string,password: string): Observable<boolean>
  {
    return this.http.post<any>(this.authUrl,{username,password})
    .pipe(map(response => {
      const token = response.token;
      const isAdmin = response.isAdmin;

      if(token){
        localStorage.setItem('currentUser',JSON.stringify({username,password,isAdmin,token: token}));
        return true;
      }else{
        return false;
      }
    }));
  }

  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.token;
  }

  getUsername(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.username;
  }

  isUserAdmin() : boolean{
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.isAdmin;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}