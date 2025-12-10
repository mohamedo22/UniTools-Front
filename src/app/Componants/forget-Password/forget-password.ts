import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Shared/shared.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VerifyOtpDto } from '../../Models/Auth-DTOs/verify-otp.dto';
import { GenerateOTPDto } from '../../Models/Auth-DTOs/generate-o-t-p.dto';

@Component({
  selector: 'app-reset-password',
  templateUrl: './forget-password.html',
  styleUrls: ['./forget-password.css'],
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
})
export class ForgetPassword implements OnInit, OnDestroy {
  showOtpForm = false;
  loading = false;
  verifying = false;
  email = '';
  otp: string = '';
  timeLeft = 0;
  timer: any;

  generateOtpDto = new GenerateOTPDto();
  verifyOtpDto = new VerifyOtpDto();
  
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private sharedService: SharedService
  ) {}

  ngOnInit() {}

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  sendOtp() {
    if (!this.email) {
      this.sharedService.showToast('Please enter your email address', 'error');
      return;
    }
    
    if (!this.isValidEmail(this.email)) {
      this.sharedService.showToast('Please enter a valid email address', 'error');
      return;
    }

    this.loading = true;
    this.generateOtpDto.Email = this.email;

    this.authService.sendResetOtp(this.generateOtpDto).subscribe({
      next: (response) => {
        this.loading = false;
        this.showOtpForm = true;
        this.startTimer();
        this.sharedService.showToast('OTP sent successfully to your email', 'success');
      },
      error: (error) => {
        this.loading = false;
        const errorMessage = error.error?.message || 'Failed to send OTP. Please try again.';
        this.sharedService.showToast(errorMessage, 'error');
      }
    });
  }

  startTimer() {
    this.timeLeft = 120;
    clearInterval(this.timer);
    
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  onOtpInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    // Allow only digits
    const numericValue = value.replace(/\D/g, '');
    
    // Limit to 6 digits
    this.otp = numericValue.slice(0, 6);
    input.value = this.otp;
  }

  onOtpKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    
    // Allow only digits and control keys
    if (!/^\d$/.test(event.key) && 
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 
          'Home', 'End', 'Tab', 'Control', 'Alt', 'Shift'].includes(event.key)) {
      event.preventDefault();
    }
  }

  onOtpPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    
    if (!clipboardData) return;
    
    const pastedText = clipboardData.getData('text');
    const numbers = pastedText.replace(/\D/g, '');
    
    if (numbers.length === 0) return;
    
    // Take only first 6 digits
    this.otp = numbers.slice(0, 6);
  }

  isOtpComplete(): boolean {
    return this.otp.length === 6 && /^\d+$/.test(this.otp);
  }

  verifyOtp() {
    if (!this.isOtpComplete()) {
      this.sharedService.showToast('Please enter all 6 digits of the OTP', 'error');
      return;
    }
    
    this.verifying = true;
    
    this.verifyOtpDto.Email = this.email;
    this.verifyOtpDto.Otp = this.otp;

    this.authService.verifyResetOtp(this.verifyOtpDto).subscribe({
      next: (response) => {
        this.verifying = false;
        this.sharedService.showToast('OTP verified successfully!', 'success');
        
        this.router.navigate(['/reset-password'], { 
          queryParams: { 
            email: this.email,
            verified: true 
          } 
        });
      },
      error: (error) => {
        this.verifying = false;
        const errorMessage = error.error?.message || 'Invalid OTP. Please try again.';
        this.sharedService.showToast(errorMessage, 'error');
        
        this.otp = '';
      }
    });
  }

  resendOtp() {
    if (this.timeLeft > 0) {
      this.sharedService.showToast(`Please wait ${this.formatTime(this.timeLeft)} before resending`, 'info');
      return;
    }
    
    this.sendOtp();
  }

  goBack() {
    this.showOtpForm = false;
    this.otp = '';
    clearInterval(this.timer);
    this.timeLeft = 0;
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}