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
  console.log('Calling menu API...');
  this.http.get<Menu[]>('http://localhost:8080/api/menus')
    .subscribe({
      next: (data) => {
        console.log('Menus received from backend:', data);
        this.menus$.next(data);
      },
      error: (err) => {
        console.error('Menu API error', err);
      }
    });
}


  // Get menus as Observable
  getMenus(): Observable<Menu[]> {
    return this.menus$.asObservable();
  }
}
