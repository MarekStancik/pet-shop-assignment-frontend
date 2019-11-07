import { Injectable } from '@angular/core';
import { Pet } from '../pet';
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

export class PetService {

  private petsUrl = 'https://localhost:44399/api/pets';

  constructor(private http: HttpClient, private authenticationService: AuthService) { }

  prepareHeaders(){
    httpOptions.headers = httpOptions.headers.set('Authorization','Bearer ' + this.authenticationService.getToken());
  }

  create(pet: Pet):Observable<Pet>{
    this.prepareHeaders();
    return this.http.post<Pet>(this.petsUrl,pet,httpOptions);
  }

  getAll(): Observable<Pet[]>{ 
    return this.http.get<Pet[]>(this.petsUrl);
  }

  getById(id: number): Observable<Pet>{
    const url = this.petsUrl + '/' + id;
    return this.http.get<Pet>(url);
  }

  update(pet:Pet): Observable<Pet>{
    this.prepareHeaders();
    return this.http.put<Pet>(this.petsUrl + '/' + pet.id,pet,httpOptions);
  }

  delete(pet: Pet): Observable<any>{
    this.prepareHeaders();
    const url = this.petsUrl + '/' + pet.id;
    return this.http.delete(url,httpOptions);
  }
}
