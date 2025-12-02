import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule, NgForm } from '@angular/forms';
import { ILoginDto } from '../../Models/Auth-DTOs/login.dto';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login-componant',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login-componant.html',
  styleUrl: './login-componant.css',
  providers: [AuthService],
})
export class LoginComponant {

  constructor(private authService: AuthService) {}
  
  model = new ILoginDto();

  

  onSubmit(form:NgForm) {
    if (form.valid) {
      this.authService.login(this.model).subscribe(response => {
        console.log('Login successful', response);
      }, error => {
        console.error('Login failed', error);
      });
    }
  }

}
