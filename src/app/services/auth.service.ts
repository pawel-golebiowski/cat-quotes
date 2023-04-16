import { Injectable } from '@angular/core';

const IS_LOGGED_KEY = 'isLogged';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl: string = '/login';
  private isLoggedIn: boolean = false;

  constructor() {
    const isLogged = localStorage.getItem(IS_LOGGED_KEY);
    this.isLoggedIn = isLogged === 'true';
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setUserLoggedIn(isLogged: boolean) {
    this.isLoggedIn = isLogged;
    localStorage.setItem(IS_LOGGED_KEY, String(isLogged));
  }

  getLoginUrl() {
    return this.loginUrl;
  }
}
