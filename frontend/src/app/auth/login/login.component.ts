import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitting = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.messageType = 'error';
      this.message = 'Please fix the highlighted fields before signing in.';
      return;
    }

    this.submitting = true;
    this.message = '';
    this.messageType = '';

    try {
      await this.authService.login(this.loginForm.value);
      this.messageType = 'success';
      this.message = 'Login successful! Redirecting…';
    } catch (err) {
      this.messageType = 'error';
      this.message = typeof err === 'string' ? err : 'Unable to sign in right now.';
    } finally {
      this.submitting = false;
    }
  }
}