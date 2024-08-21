import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAccountsService {
  private apiUrl = 'http://localhost:5119/api/UserAccountsManagement';

  constructor(private http: HttpClient) {}

  // Fetch all users
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Delete a user by ID
  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, user); // Ensure this URL matches your API endpoint
  }
  
  
}
