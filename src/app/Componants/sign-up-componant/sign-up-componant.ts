import { Component } from '@angular/core';
import { IRegisterDto } from '../../Models/Auth-DTOs/register.dto';
import { AuthService } from '../../Services/auth.service';
import { SharedService } from '../../Shared/shared.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sign-up-componant',
  imports: [ FormsModule , CommonModule , RouterLink],
  templateUrl: './sign-up-componant.html',
  styleUrl: './sign-up-componant.css',
  providers: [AuthService , SharedService],
})
export class SignUpComponant {

  isLoading: boolean = false;

  constructor(private authService: AuthService , private sharedService:SharedService , private router:Router) {
   
  }

  model = new IRegisterDto();
  
  confirmPassword = '';
  termsAccepted = false;

  // Password validation helpers
  hasUpperCase(): boolean {
    return /[A-Z]/.test(this.model.userPassword);
  }

  hasLowerCase(): boolean {
    return /[a-z]/.test(this.model.userPassword);
  }

  hasNumber(): boolean {
    return /[0-9]/.test(this.model.userPassword);
  }

  hasSpecialChar(): boolean {
    return /[.@$!%*?&#]/.test(this.model.userPassword);
  }

  getPasswordStrength(): number {
    if (!this.model.userPassword) return 0;
    
    let strength = 0;
    if (this.model.userPassword.length >= 8) strength++;
    if (this.hasUpperCase()) strength++;
    if (this.hasLowerCase()) strength++;
    if (this.hasNumber()) strength++;
    if (this.hasSpecialChar()) strength++;
    
    // Convert to 0-4 scale
    return Math.min(Math.floor(strength), 4);
  }

  passwordsMatch(): boolean {
    return this.model.userPassword === this.confirmPassword;
  }

  onSubmit(form: any) {
    this.isLoading = true;
    if (form.valid && this.passwordsMatch() && this.termsAccepted) {
      
      this.authService.Register(this.model).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.sharedService.showToast('Registration Successful', 'success');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.sharedService.showToast('Registration Failed: ' + err.error.message, 'error');
        }
      });


    } else {
      
      Object.keys(form.controls).forEach(key => {
        const control = form.controls[key];
        control.markAsTouched();
      });
      this.isLoading = false;
    }
  }
}