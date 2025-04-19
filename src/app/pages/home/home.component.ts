import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  skills: { skillName: string }[] = [];
  projects: any[] = [];

  user = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSkills();
    this.getProjects();
  }

  getSkills(): void {
    this.http.get<{ skillName: string }[]>('http://localhost:8080/api/skills').subscribe(
      (data) => {
        this.skills = data;
      },
      (error) => {
        console.error('Error fetching skills:', error);
      }
    );
  }

  getProjects() {
    this.http.get<any[]>('http://localhost:8080/api/projects')
      .subscribe((data) => {
        this.projects = data;
      }, (error) => {
        console.error('Error fetching projects:', error);
      });
  }

    onSubmit() {
      const url = 'http://localhost:8080/portfolio/user/add'; // Replace with your backend URL
  
      this.http.post(url, this.user).subscribe(
        (response) => {
          console.log('Message sent successfully:', response);
          window.alert('Your message has been sent successfully!');
          
          // Clear the form fields after submission
          this.user = {
            name: '',
            email: '',
            message: ''
          };
        },
        (error) => {
          console.error('Error sending message:', error);
          window.alert('There was an error sending your message. Please try again later.');
        }
      );
    }
}
