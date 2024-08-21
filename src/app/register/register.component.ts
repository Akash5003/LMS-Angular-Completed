import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    userName: '',
    name: '',
    password: '',
    role: 'user'  // Default role
  };

  confirmPassword: string = ''; // New field for confirm password
  registrationError: string = '';
  registrationSuccess: string = '';
  passwordMismatch: boolean = false; // New field for password mismatch

  constructor(private userService: UserService) {}

  onRegister(form: NgForm) {
    if (form.valid && this.confirmPassword === this.registerData.password) {
      this.passwordMismatch = false; // Reset mismatch flag
      this.userService.registerUser(this.registerData).subscribe(
        response => {
          if (response.isSuccess) {
            this.registrationSuccess = 'Registration successful!';
            this.registrationError = '';
          } else {
            this.registrationSuccess = '';
            this.registrationError = response.errorMessages.join(', ');
          }
          form.resetForm();
          this.registerData = {
            userName: '',
            name: '',
            password: '',
            role: 'user'
          };
          this.confirmPassword = ''; // Reset confirm password
        },
        error => {
          this.registrationSuccess = '';
          this.registrationError = 'An error occurred while registering.';
        }
      );
    } else {
      this.passwordMismatch = this.confirmPassword !== this.registerData.password; // Set mismatch flag
      this.registrationError = 'Please fill out the form correctly.';
      this.registrationSuccess = '';
    }
  }
}
