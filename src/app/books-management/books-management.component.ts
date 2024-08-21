import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-management',
  templateUrl: './books-management.component.html',
  styleUrls: ['./books-management.component.css']
})
export class BooksManagementComponent implements OnInit {
  books: any[] = [];
  bookData = {
    bookTitle: '',
    authorName: '',  
    language: '',
    pdfFile: null as File | null 
  };
  bookIdToDelete: number | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;
  formSubmitted: boolean = false;

  @ViewChild('pdfFileInput') pdfFileInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private bookService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.loading = true;
    this.bookService.getAllBooks().subscribe(
      response => {
        if (response.isSuccess) {
          this.books = response.result || [];
        } else {
          this.errorMessage = 'Failed to load books.';
        }
        this.loading = false;
      },
      error => {
        console.error('Error fetching books:', error);
        this.errorMessage = 'Failed to load books.';
        this.loading = false;
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bookData.pdfFile = file;
    } else {
      this.bookData.pdfFile = null;
    }
  }

  addBook() {
    this.formSubmitted = true;
    if (!this.bookData.bookTitle || !this.bookData.authorName || !this.bookData.language || !this.bookData.pdfFile) {
      
      return;
    }

    const formData = new FormData();
    formData.append('bookTitle', this.bookData.bookTitle);
    formData.append('authorName', this.bookData.authorName); 
    formData.append('language', this.bookData.language); 
    formData.append('pdfFile', this.bookData.pdfFile); 

    this.bookService.addBook(formData).subscribe(
      response => {
        if (response.isSuccess) {
          alert('Book added successfully');
          this.getBooks();
          this.resetForm();
         
        } else {
          this.errorMessage = response.errorMessages.join(', ');
          alert(this.errorMessage);
        }
      },
      error => {
        console.error('Error adding book:', error);
        this.errorMessage = 'BookTitle Already Exist. Please try to Add New.';
        alert(this.errorMessage);
      }
    );
  }

  prepareToDeleteBook(id: number) {
    this.bookIdToDelete = id;
  }

  deleteBook() {
    if (this.bookIdToDelete !== null) {
      this.bookService.deleteBook(this.bookIdToDelete).subscribe(
        response => {
          if (response.isSuccess) {
            alert('Book deleted successfully');
            this.getBooks();
            this.bookIdToDelete = null;
          } else {
            this.errorMessage = response.errorMessages.join(', ');
            alert(this.errorMessage);
          }
        },
        error => {
          console.error('Error deleting book:', error);
          this.errorMessage = 'Failed to delete book. Please try again later.';
          alert(this.errorMessage);
        }
      );
    }
  }

  resetForm() {
    this.bookData = { bookTitle: '', authorName: '', language: '', pdfFile: null };
    if (this.pdfFileInput) {
      this.pdfFileInput.nativeElement.value = '';
    }
    this.formSubmitted = false; // Reset the form submission state
  }
    
}
