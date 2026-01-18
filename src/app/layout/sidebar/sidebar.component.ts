import { Component, OnInit } from '@angular/core';
import { MenuStateService } from '../../services/menu-state.service';
import { Menu } from '../../models/menu.model';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menus$!: Observable<Menu[]>;
  parentMenus$!: Observable<Menu[]>;

  constructor(private menuService: MenuStateService) {}

  ngOnInit(): void {
    this.menuService.loadMenus(); // 🔴 REQUIRED

    this.menus$ = this.menuService.getMenus();

    this.parentMenus$ = this.menus$.pipe(
      map(menus => menus.filter(menu => !menu.parentCode))
    );
  }

getChildren(parentCode: string, menus: Menu[] | null): Menu[] {
  if (!menus) return [];
  return menus.filter(m => m.parentCode === parentCode);
}

}
