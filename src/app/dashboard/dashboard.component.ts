import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
import { BorrowhistoryService } from '../services/borrowhistory.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  books: any[] = []; 
  bookIdToGet: number = 0; 
  userId: number = 1; 
  errorMessage: string = '';
  successMessage: string = '';
  user: any = {};
 // @Input() data: string='empty';
  constructor(private booksService: BooksService,private borrowservice:BorrowhistoryService, private router: Router) {}

  ngOnInit() {
    this.getUserDetails();
    this.getBooks();
  }
  getUserDetails() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.userId = this.user.id; 
    } else {
      this.errorMessage = 'User details not found. Please log in again.';
      this.router.navigate(['/login']);
    }
  }

  getBooks() {
    this.booksService.getAllBooks().subscribe(
      response => {
        if (response.isSuccess) {
          this.books = response.result; 
        } else {
          this.errorMessage = response.errorMessages.join(', ');
        }
      },
      error => {
        this.errorMessage = 'Error fetching books: ' + error.message;
      }
    );
  }

  borrowBook(bookId: number,userId:number ) {
    this.borrowservice.borrowBook(bookId, userId).subscribe(
      response => {
        if (response.isSuccess) {
          this.successMessage = 'Book borrowed successfully!';
          this.getBooks(); 
        } else {
          
        }
      },
      error => {
        alert('Error borrowing book: ' + 'Enter Valid Book Id');
      }
    );
  }

  returnBook(bookId: number) {
    this.borrowservice.returnBook(bookId, this.userId).subscribe(
      response => {
        if (response.isSuccess) {
          this.successMessage = 'Book returned successfully!';
          this.getBooks(); 
        } else {
          alert('Error returning book: ' + response.errorMessages.join(', '));
        }
      },
      error => {
        alert('Error returning book: ' + error.message);
      }
    );
  }
  getBookById() {
    if (this.bookIdToGet) {
      // Borrow the book first
      this.borrowBook(this.bookIdToGet, this.userId);
      
      // Then fetch the book by ID
      this.booksService.getBookById(this.bookIdToGet).subscribe(
        (response: Blob) => {
          // Create a new URL for the Blob and trigger the download
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Book_${this.bookIdToGet}.pdf`; 
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error => {
          this.errorMessage = 'Error fetching book: ' + error.message;
          alert('Error fetching book. Please try again.');
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid Book ID';
    }
  }
  
  }
  
  
      
    
  

