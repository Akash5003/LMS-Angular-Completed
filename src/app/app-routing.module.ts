import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BooksManagementComponent } from './books-management/books-management.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BorrowhistorymanagementComponent } from './borrowhistorymanagement/borrowhistorymanagement.component';



const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent,canActivate:[AuthGuard] }, 
  { path: 'books-management', component: BooksManagementComponent },
  { path: 'user-management', component: UsersManagementComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'borrowhistorymanagement', component: BorrowhistorymanagementComponent },

  { path: '', redirectTo: '/login',pathMatch: 'full' } 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
