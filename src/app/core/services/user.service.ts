import { computed, Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../shared/models/user.model';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USER_KEY = 'tanuki_user';
  private readonly userSignal = signal<User>(this.loadOrCreateGuestUser());

  readonly user = this.userSignal.asReadonly();
  readonly isLoggedIn = computed(() => !this.user().isGuest);

  constructor(private readonly router: Router) {
  }

  setLoggedInUser(id: string): void {
    const user: User = {
      id,
      isGuest: false,
    };
    this.userSignal.set(user);
    this.saveUser(user);
  }

  logout(): void {
    const newUser: User = {
      id: uuidv4(),
      isGuest: true,
    };
    this.userSignal.set(newUser);
    this.saveUser(newUser);
  }

  private loadOrCreateGuestUser(): User {
    const savedUser = localStorage.getItem(this.USER_KEY);
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }

    const newUser: User = {
      id: uuidv4(),
      isGuest: true,
    };
    this.saveUser(newUser);
    return newUser;
  }

  private saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}
