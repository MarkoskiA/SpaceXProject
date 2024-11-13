import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private sessionStorageChange = new BehaviorSubject<string | null| undefined>(null);

  public sessionStorageChange$ = this.sessionStorageChange.asObservable();

  constructor() {}

  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
    this.sessionStorageChange.next(key);
  }

  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
    this.sessionStorageChange.next(key);
  }

  clear(): void {
    sessionStorage.clear();
    this.sessionStorageChange.next(null);
  }
}
