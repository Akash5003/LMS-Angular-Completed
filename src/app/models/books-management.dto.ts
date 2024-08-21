// src/app/models/books-management.dto.ts

export interface BooksManagementDTO {
    id?: number; // Optional for new books
    bookTitle: string;
    author: string;
    description?: string;
    pdfFile?: File; // This could be used for file uploads
    pdfFileData?: string; // Base64 string if you're handling it that way
  }
  