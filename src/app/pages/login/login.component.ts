import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  showRegister: boolean = false;
  passwordError: string = '';
  isRegisterAllowed: boolean = false;  // Controls visibility of the Register button
  showPassword: boolean = false;
showRegisterPassword: boolean = false;

  constructor(private http: HttpClient, private router: Router,   private authService: AuthService  // Inject AuthService
  ) {}

  ngOnInit(): void {

    this.getusers();

      // Prevent right-click
  document.addEventListener('contextmenu', this.disableRightClick);

  }

  
// Detach event listener on destroy
ngOnDestroy(): void {
  document.removeEventListener('contextmenu', this.disableRightClick);
}

disableRightClick = (event: MouseEvent) => {
  event.preventDefault();
  alert('Right click has been disabled by the developer.');
};

  toggleForm() {
    this.showRegister = !this.showRegister;
    this.passwordError = '';
    this.registerEmail = '';
    this.registerPassword = '';
  }

  getusers() {
    this.http.get<any[]>('http://localhost:8080/api/users')
      .subscribe({
        next: (users) => {
          console.log('Users fetched:', users);  // Debug output
          this.isRegisterAllowed = users.length === 0;  // Show Register only if no users exist
          console.log('isRegisterAllowed:', this.isRegisterAllowed);  // Debug output
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
  }

  onSubmit() {
    const payload = { username: this.email, password: this.password };
  
    this.http.post('http://localhost:8080/api/login', payload, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          alert(response);
          if (response === 'Login successful!') {
            this.authService.login(); // Set the login state
            this.router.navigate(['/loggedpage']); // Navigate to the logged page
          }
        },
        error: (error) => {
          alert('Login failed. Please try again.');
          console.error('Login Error:', error);
        }
      });
  }

  onRegister() {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$/;

    if (!regex.test(this.registerPassword)) {
      this.passwordError = 'Password must include 1 uppercase letter, 1 special character, and 1 number.';
      return;
    }

    const payload = { username: this.registerEmail, password: this.registerPassword };

    this.http.post('http://localhost:8080/api/register', payload, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          alert(response);
          this.toggleForm();
        },
        error: (error) => {
          alert('Registration failed. Please try again.');
          console.error('Register Error:', error);
        }
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  toggleRegisterPasswordVisibility() {
    this.showRegisterPassword = !this.showRegisterPassword;
  }



}
