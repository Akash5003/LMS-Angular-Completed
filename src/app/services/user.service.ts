import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5119/api/UsersAuth/Register'; 
  private loginUrl = 'http://localhost:5119/api/UsersAuth/Login';

  constructor(private http: HttpClient) {}

  registerUser(registerData: any): Observable<any> {
    
    return this.http.post<any>(this.apiUrl, registerData);
    
  } 
  loginUser(loginData: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginData);
}
}
