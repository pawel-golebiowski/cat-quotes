import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
})
export class LoginViewComponent {
  loginFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private _authService: AuthService
  ) {
    this.loginFormGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  login() {
    if (this.loginFormGroup.valid) {
      this._authService.setUserLoggedIn(true);
      this._route.navigate(['/quotes']);
    }
  }
}
