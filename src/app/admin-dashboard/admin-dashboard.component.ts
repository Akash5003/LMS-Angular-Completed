import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  navigateToBooksManagement() {
    this.router.navigate(['/books-management']);
  }
  navigateToBorrowHistoryManagement() {
    this.router.navigate(['/borrow-history-management']);
  }
}
