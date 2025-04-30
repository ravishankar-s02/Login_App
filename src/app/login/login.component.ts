import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient) {}

  onLogin() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:5229/api/auth/login', credentials)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Login successful!';
          this.errorMessage = '';
          console.log(response);
        },
        error: (error) => {
          if (error.status === 0) {
            this.errorMessage = 'Error connecting to server. Please try again later.';
          } else {
            this.errorMessage = 'Login failed. Please check your credentials.';
          }
          this.successMessage = '';
          console.error(error);
        }
      });
  }
}
