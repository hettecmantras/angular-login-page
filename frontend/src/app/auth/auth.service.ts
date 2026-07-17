import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(credentials: { email: string; password: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const minimumPasswordLength = 6;
      setTimeout(() => {
        if (credentials.password.length >= minimumPasswordLength) {
          resolve(true);
        } else {
          reject('Password must be at least 6 characters.');
        }
      }, 900);
    });
  }
}