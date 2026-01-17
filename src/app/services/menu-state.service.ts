import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Menu } from '../models/menu.model';
@Injectable({ providedIn: 'root' })
export class MenuStateService {
  private menus$ = new BehaviorSubject<Menu[]>([]);

  constructor(private http: HttpClient) {}

  // Load menus from backend
  loadMenus(): void {
    this.http.get<Menu[]>('http://localhost:8080/api/menus')
      .subscribe({
        next: (data: Menu[]) => this.menus$.next(data),
        error: (err: HttpErrorResponse) => console.error('Failed to load menus', err)
      });
  }

  // Get menus as Observable
  getMenus(): Observable<Menu[]> {
    return this.menus$.asObservable();
  }
}
