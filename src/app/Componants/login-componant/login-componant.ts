import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule, NgForm } from '@angular/forms';
import { ILoginDto } from '../../Models/Auth-DTOs/login.dto';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../Shared/shared.service';
@Component({
  standalone: true,
  selector: 'app-login-componant',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login-componant.html',
  styleUrl: './login-componant.css',
  providers: [AuthService , SharedService],
})
export class LoginComponant {

  loading: boolean = false;

  constructor(private authService: AuthService , private sharedService:SharedService) {
   
  }
  

  model = new ILoginDto();


  onSubmit(form:NgForm) {
    this.loading = true;
    if (form.valid) {
      this.authService.Login(this.model).subscribe(
        {
          next: (res) => {
            this.loading = false;
            this.sharedService.showToast('Login Successful', 'success');
          }
          ,
          error: (err) => {
            this.loading = false;
            this.sharedService.showToast('Login Failed: ' + err.error.message, 'error');
          }
        }
      );
    }
  }

}
