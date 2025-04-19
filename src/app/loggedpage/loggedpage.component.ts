import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Project {
  id: number;
  title: string;
  description: string;
}

interface UserMessage {
  id: number;
  name: string;
  contact: string;
  message: string;
}

@Component({
  selector: 'app-loggedpage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './loggedpage.component.html',
  styleUrl: './loggedpage.component.css',
})
export class LoggedpageComponent {
  newSkill: string = '';
  skills: any[] = [];
  editingSkillId: number | null = null;
  projects: Project[] = [];
  newProjectTitle: string = '';
  newProjectDescription: string = '';
  editingProjectId: number | null = null;
  userMessages: any[] = [];


  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getSkills();
    this.Allprojects();
    this.getUserMessages();
  }

  Allprojects() {
    this.http.get<any[]>('http://localhost:8080/api/projects').subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
        alert('Failed to load projects.');
      },
    });
  }

  addSkill() {
    if (this.newSkill.trim()) {
      this.http
        .post(`${this.apiUrl}/api/skills/addskill`, { skillName: this.newSkill })
        .subscribe((skill: any) => {
          this.skills.push(skill);
          this.newSkill = ''; // Clear input after adding
        });
    }
  }

  // Fetch all skills
  getSkills() {
    this.http.get(`${this.apiUrl}/api/skills`).subscribe((data: any) => {
      this.skills = data;
    }, error => {
      console.error('Error fetching skills:', error);
    });
  }
  

  // Edit skill
  editSkill(skill: any): void {
    this.editingSkillId = skill.id;
    this.newSkill = skill.skillName;
  }
 
  // Update skill
  updateSkill(): void {
    const updatedSkill = { skillName: this.newSkill };
    this.http.put(`${this.apiUrl}/api/skills/update/${this.editingSkillId}`, updatedSkill).subscribe(() => {
      this.getSkills();
      this.newSkill = '';
      this.editingSkillId = null;
      alert('Skill updated successfully!');
    });
  }

  deleteSkill(id: number) {
    const url = `${this.apiUrl}/api/skills/${id}`;
    console.log('Deleting skill with URL:', url);  // Log the URL to verify
    this.http.delete(url).subscribe(() => {
      // Remove the skill from the list after successful deletion
      this.skills = this.skills.filter(skill => skill.id !== id);
      window.alert('Skill deleted successfully!');  // Success alert
    }, error => {
      console.error('Error deleting skill:', error);
      window.alert('Error deleting skill! Please try again.');  // Error alert
    });
  }
  
  

  // Method to add a new project
  addProject() {
    const newProject = {
      title: this.newProjectTitle.trim(), // Ensure no extra spaces
      description: this.newProjectDescription.trim(), // Ensure no extra spaces
    };

    // Log the project to be added
    console.log('Adding project:', newProject);

    // Send POST request to the backend to create the project
    this.http
      .post<any>('http://localhost:8080/api/projects/add', newProject)
      .subscribe({
        next: (data) => {
          this.projects.push(data); // Add the new project to the list
          this.newProjectTitle = ''; // Clear the input field
          this.newProjectDescription = ''; // Clear the description field
          alert('Project added successfully!'); // Success message
        },
        error: (error) => {
          console.error('Error adding project:', error);
          alert('Failed to add project. Please try again.'); // Error message
        },
      });
  }

  // Method to fetch a single project by ID
  getProjectById(id: number) {
    this.http.get<any>(`http://localhost:8080/api/projects/${id}`).subscribe({
      next: (project) => {
        console.log('Project details:', project);
        // You can set this data to a property if you want to display it in the UI
        this.newProjectTitle = project.title;
        this.newProjectDescription = project.description;
      },
      error: (error) => {
        console.error('Error fetching project:', error);
        alert('Failed to fetch project. Please try again.');
      },
    });
  }

// Edit project
editProject(project: Project) {
  this.editingProjectId = project.id;
  this.newProjectTitle = project.title;
  this.newProjectDescription = project.description;
}

// Update project
updateProject() {
  if (this.editingProjectId !== null) {
    const updatedProject = {
      title: this.newProjectTitle,
      description: this.newProjectDescription,
    };

    this.http
      .put(`${this.apiUrl}/api/projects/update/${this.editingProjectId}`, updatedProject)
      .subscribe({
        next: () => {
          this.Allprojects();
          this.editingProjectId = null;
          this.newProjectTitle = '';
          this.newProjectDescription = '';
          alert('Project updated successfully!');
        },
        error: (error) => {
          console.error('Error updating project:', error);
          alert('Failed to update project. Please try again.');
        },
      });
  }
}

  // Method to delete a project by ID
  deleteProject(id: number) {
    this.http.delete(`http://localhost:8080/api/projects/${id}`).subscribe({
      next: () => {
        // Remove the deleted project from the local list
        this.projects = this.projects.filter((project) => project.id !== id);
        alert('Project deleted successfully!');
      },
      error: (error) => {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      },
    });
  }

  getUserMessages(): void {
    this.http.get<any[]>('http://localhost:8080/portfolio/user/getAllUsers').subscribe((data) => {
      this.userMessages = data.filter(user => user.message !== null);
    });
  }


  
}
