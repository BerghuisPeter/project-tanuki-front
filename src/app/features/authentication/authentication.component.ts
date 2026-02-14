import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";
import { APP_PATHS } from "../../shared/models/app-paths.model";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  styleUrls: ['./authentication.component.scss'],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent {
  loginForm: FormGroup;
  isLoginMode = signal(true);
  isLoadingQuery = signal(false);
  authenticationError = signal<string | null>(null);

  constructor(private fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly router: Router) {
    this.loginForm = this.fb.group({
      email: ['p@test.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['123456']
    });
  }

  toggleMode() {
    this.isLoginMode.update(v => !v);
    const confirmPassword = this.loginForm.get('confirmPassword');
    if (this.isLoginMode()) {
      confirmPassword?.clearValidators();
    } else {
      confirmPassword?.setValidators([this.samePasswordsValidator()]);
    }
    confirmPassword?.updateValueAndValidity();
  }

  samePasswordsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = this.loginForm?.get('password')?.value;
      const confirmPassword = control.value;

      if (password && confirmPassword && password !== confirmPassword) {
        return { samePasswords: true };
      }

      return null;
    };
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (this.isLoginMode()) {
        this.handleLogin();
      } else {
        this.handleRegister();
      }
    }
  }

  handleLogin() {
    this.isLoadingQuery.set(true);
    this.authenticationError.set(null);
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => this.router.navigate([APP_PATHS.HOME], { replaceUrl: true }),
      error: (err) => {
        if (err.status === 401) {
          this.authenticationError.set('Invalid email or password');
        } else {
          this.authenticationError.set('Server error. Try again.');
        }
      },
      complete: () => this.isLoadingQuery.set(false)
    });
  }

  handleRegister() {
    this.isLoadingQuery.set(true);
    this.authenticationError.set(null);
    this.authService.register(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => this.router.navigate([APP_PATHS.HOME], { replaceUrl: true }),
      error: (err) => {
        if (err.status === 401) {
          this.authenticationError.set('Invalid email or password');
        } else {
          this.authenticationError.set('Server error. Try again.');
        }
      },
      complete: () => this.isLoadingQuery.set(false)
    });
  }
}
