import { Component, OnInit } from '@angular/core';
import { MenuStateService } from '../../services/menu-state.service';
import { Menu } from '../../models/menu.model';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone:true,
  imports:[CommonModule]
})
export class SidebarComponent implements OnInit {
  menus$!: Observable<Menu[]>;       // all menus
  parentMenus$!: Observable<Menu[]>; // only parents

  constructor(private menuService: MenuStateService) {}

  ngOnInit(): void {
    this.menus$ = this.menuService.getMenus();

    // filter parent menus
    this.parentMenus$ = this.menus$.pipe(
      map(menus => menus.filter(menu => !menu.parentCode))
    );
  }

  getChildren(menuCode: string, allMenus: Menu[]): Menu[] {
    return allMenus.filter(m => m.parentCode === menuCode);
  }
}
