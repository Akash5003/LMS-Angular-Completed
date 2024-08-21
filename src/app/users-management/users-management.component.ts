import { Component, OnInit } from '@angular/core';
import { UserAccountsService } from '../services/useraccounts.service';  

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {
  users: any[] = [];
  newUser = {
    username: '',
    name:'',
    password: '',
    confirmPassword: '',
    role: 'user'
  };
  errorMessage: string | null = null;
  successMessage: string | null = null; 

  constructor(private userAccountsService: UserAccountsService) {}  

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userAccountsService.getUsers().subscribe(
      response => {
        if (response.isSuccess) {
          this.users = response.result || [];
        } else {
          this.errorMessage = 'Failed to load users.';
        }
      },
      error => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Failed to load users.';
      }
    );
  }
  

  deleteUser(userId: number) {
    this.userAccountsService.deleteUser(userId).subscribe(
      response => {
        if (response.isSuccess) {
          this.loadUsers(); 
        } else {
          this.errorMessage = 'Failed to delete user.';
        }
      },
      error => {
        console.error('Error deleting user:', error);
        this.errorMessage = 'Failed to delete user.';
      }
    );
  }
  confirmDelete(userId: number) {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      this.deleteUser(userId);
    }}

  addUser() {
    if (this.newUser.password !== this.newUser.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.userAccountsService.registerUser(this.newUser).subscribe(
      response => {
        if (response.isSuccess) {
          this.loadUsers(); 
          this.successMessage = 'User added successfully!';
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
          this.newUser = { username: '', name:'',password: '', confirmPassword: '', role: '' };
        } else {
          this.errorMessage = 'Failed to add user.';
        }
      },
      error => {
        console.error('Error adding user:', error);
        this.errorMessage = 'Failed to add user.';
      }
    );
  }
}
