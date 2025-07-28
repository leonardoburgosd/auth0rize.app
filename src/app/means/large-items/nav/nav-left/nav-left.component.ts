import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

interface MenuItem {
  icon: string
  label: string
  active: boolean,
  ruta: string
}

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit {
  @Input() sidebarOpen: boolean = true;

  userName: string = '';
  email: string = '';
  profileMenuOpen: boolean = false;
  menuItems: MenuItem[] = [
    { icon: "fas fa-home", label: "Dashboard", active: true, ruta: "/dashboard" },
    { icon: "fas fa-users", label: "Usuarios", active: false, ruta: "/dashboard/users" },
    { icon: "fas fa-users", label: "Dominios", active: false, ruta: "/dashboard/domain" },
  ]

  setActiveMenuItem(index: number): void {
    this.menuItems.forEach((item, i) => {
      item.active = i === index
    })
  }

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userName = JSON.parse(this.cookieService.get("basicData")).userName;
    this.email = JSON.parse(this.cookieService.get("basicData")).email;
  }

  closeSession() {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

  onProfileClick(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }
}
