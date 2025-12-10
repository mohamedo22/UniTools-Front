import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({

  providedIn: 'root',
})
export class AuthService {
  private apiUrl =  environment.baseUrl ;
  
  constructor(private http : HttpClient) {}

  Login(loginDTO:any) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/login`, loginDTO);
  }

  Register(registerDTO:any) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/register`, registerDTO);
  }
  sendResetOtp(generateOtpDto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/ForgotPassword`,  generateOtpDto );
  }

  verifyResetOtp(verifyOtpDto:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/VerifyOtp`, verifyOtpDto);
  }

}
