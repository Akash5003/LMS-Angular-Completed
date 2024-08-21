import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    username: '',
    password: ''
  };
  errorMessage:any;
  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    this.userService.loginUser(this.loginData).subscribe(
      response => {
        console.log('Login response:', response);
        if (response.isSuccess) {
          // Save the token (you can also save it to localStorage or sessionStorage)
          localStorage.setItem('token', response.result.token);
          localStorage.setItem('user', JSON.stringify(response.result.user));
          
          // Navigate to another page after successful login
          const role = response.result.user.role ? response.result.user.role.trim().toLowerCase() : '';
          if (role === 'admin') {
            // Navigate to admin dashboard
            this.router.navigate(['/admin-dashboard']); 
          } else {
              
            // Navigate to user dashboard
            this.router.navigate(['/dashboard']); 
          }
          
        } else {
          // Handle unsuccessful login

          alert(response.errorMessages.join(', ')); 
        }

      },
      error => {
        // Handle error response from API
        alert('Login failed: ' + 'Invalid Username and Password');
      }
    );
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

}
