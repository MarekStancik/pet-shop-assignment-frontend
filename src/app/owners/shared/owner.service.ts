import { Injectable } from '@angular/core';
import { Owner } from '../Owner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private ownersUrl = 'https://localhost:44399/api/Owners';

  constructor(private http: HttpClient,private authService: AuthService) { }

  prepareHeaders(){
    httpOptions.headers = httpOptions.headers.set('Authorization','Bearer ' + this.authService.getToken());
  }

  create(owner: Owner):Observable<Owner>{
    this.prepareHeaders();
    return this.http.post<Owner>(this.ownersUrl,owner,httpOptions);
  }

  getAll(): Observable<Owner[]>{
    return this.http.get<Owner[]>(this.ownersUrl);
  }

  getById(id: number): Observable<Owner>{
    const url = this.ownersUrl + '/' + id;
    return this.http.get<Owner>(url);
  }

  update(owner:Owner): Observable<Owner>{
    this.prepareHeaders();
    return this.http.put<Owner>(this.ownersUrl + '/' + owner.id,owner);
  }

  delete(owner: Owner): Observable<any>{
    this.prepareHeaders();
    const url = this.ownersUrl + '/' + owner.id;
    return this.http.delete(url);
  }
}
