import { Component, OnInit } from '@angular/core';
import { BorrowhistoryService } from '../services/borrowhistory.service';

@Component({
  selector: 'app-borrowhistorymanagement',
  templateUrl: './borrowhistorymanagement.component.html',
  styleUrls: ['./borrowhistorymanagement.component.css']
})
export class BorrowhistorymanagementComponent implements OnInit {
  borrowHistories: any[] = [];
  message: string = '';
  recordIdToDelete: number | null = null; 
  constructor(private borrowHistoryService: BorrowhistoryService) {}

  ngOnInit(): void {
    this.loadBorrowHistories();
  }

  loadBorrowHistories(): void {
    this.borrowHistoryService.getAllBorrowHistories().subscribe(
      (data: any[]) => {
        this.borrowHistories = data;
        if (this.borrowHistories.length === 0) {
          this.message = 'No borrow history records found.';
        }
      },
      error => {
        console.error('Error fetching borrow history details:', error);
        this.message = 'An error occurred while fetching borrow history.';
      }
    );
  }

  prepareToDeleteRecord(id: number): void {
    this.recordIdToDelete = id; // Set the ID of the record to be deleted
  }

  deleteRecord(): void {
    if (this.recordIdToDelete !== null) {
      this.borrowHistoryService.deleteBorrowHistory(this.recordIdToDelete).subscribe(
        () => {
          this.borrowHistories = this.borrowHistories.filter(record => record.id !== this.recordIdToDelete);
          this.message = 'Record deleted successfully.';
          setTimeout(() => this.message = '', 3000);
          this.recordIdToDelete = null; // Reset the ID
        },
        error => {
          console.error('Error deleting record:', error);
          this.message = 'An error occurred while deleting the record.';
          setTimeout(() => this.message = '', 3000);
        }
      );
    }
  }
}
