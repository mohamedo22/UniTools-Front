import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({

  providedIn: 'root',
})
export class AuthService {
  private apiUrl =  environment.baseUrl + '/auth';

  constructor(private http : HttpClient) {}

  login(loginDTO:any) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginDTO);
  }

}
