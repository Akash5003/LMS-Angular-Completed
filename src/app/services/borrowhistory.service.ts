import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BorrowhistoryService {
  private apiUrl = 'http://localhost:5119/api/BorrowHistory';
  private booksApiUrl = 'http://localhost:5119/api/BooksManagement'; // Update as needed
  private usersApiUrl = 'http://localhost:5119/api/Users'; // Update as needed

  constructor(private http: HttpClient) { }

  getAllBorrowHistories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getBookTitle(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.booksApiUrl}/${bookId}`);
  }

  getUserName(userId: number): Observable<any> {
    return this.http.get<any>(`${this.usersApiUrl}/${userId}`);
  }

  deleteBorrowHistory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  borrowBook(bookId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/BorrowBook`, { Book_Id: bookId, User_Id: userId });
  }

  returnBook(bookId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ReturnBook`, { Book_Id: bookId, User_Id: userId });
  }
}
