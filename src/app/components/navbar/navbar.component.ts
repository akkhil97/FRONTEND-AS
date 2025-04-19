import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showSettings = false;
  adminUsername = '';
  adminPassword = '';
  showPassword = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isLoggedPage(): boolean {
    return this.router.url.includes('loggedpage');
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openSettings() {
    this.showSettings = true;
    this.adminUsername = this.authService.getCurrentUsername();
  }

  closeSettings() {
    this.showSettings = false;
    this.adminUsername = '';
    this.adminPassword = '';
    this.showPassword = false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  saveSettings() {
    this.authService.updateCredentials(this.adminUsername, this.adminPassword).subscribe({
      next: (response: string) => {
        alert(response); // The response is now a plain string, e.g., "User updated successfully!"
        this.authService.setCurrentUsername(this.adminUsername);
        alert(`Admin credentials updated successfully! New username: ${this.adminUsername}`);
        this.closeSettings();
      },
      error: (err) => {
        console.error('Error updating user:', err);
        alert('Failed to update settings. Please try again.');
      }
    });
  }
  
}
