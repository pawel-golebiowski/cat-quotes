import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
})
export class LoginViewComponent {
  loginFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private route: Router) {
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
      this.route.navigate(['/quotes']);
    }
  }
}
