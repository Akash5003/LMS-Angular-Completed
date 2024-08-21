// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    
    if (token) {
      const userRole = this.getUserRoleFromToken(token);
      // Allow access based on user role
      if (userRole === 'admin' || userRole === 'user') {
      
      return true; // Allow access
    }
  }
    this.router.navigate(['/login']); // Redirect to login if not authenticated
    return false; // Deny access
  }
  getUserRoleFromToken(token: string | null) {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
      return payload.role || ''; // Return the role, or empty if not present
    }
    return ''; 
  }
}
