import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface MenuItem {
  icon: string
  label: string
  ruta: string
}

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss'],
  standalone: false
})
export class NavLeftComponent implements OnInit, OnDestroy {
  @Input() sidebarOpen: boolean = true;

  userName: string = '';
  email: string = '';
  profileMenuOpen: boolean = false;
  activeRoute: string = '';
  private routerSub!: Subscription;

  menuItems: MenuItem[] = [
    { icon: "fas fa-home", label: "Dashboard", ruta: "/dashboard" },
    { icon: "fas fa-users", label: "Usuarios", ruta: "/dashboard/users" },
    { icon: "fas fa-globe", label: "Dominios", ruta: "/dashboard/domain" },
    { icon: "fas fa-briefcase", label: "Negocios", ruta: "/dashboard/negocio" },
    { icon: "fas fa-cubes", label: "Aplicaciones", ruta: "/dashboard/application" },
  ]

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userName = JSON.parse(this.cookieService.get("basicData")).userName;
    this.email = JSON.parse(this.cookieService.get("basicData")).email;

    // Establece la ruta activa al cargar (incluye refresh)
    this.setActiveFromUrl(this.router.url);

    // Actualiza la ruta activa en cada navegación
    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.setActiveFromUrl(event.urlAfterRedirects || event.url);
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  /**
   * Determina cuál ítem del menú está activo comparando la URL actual.
   * Se elige el ítem cuya ruta sea el prefijo más largo que coincida.
   */
  private setActiveFromUrl(url: string): void {
    // Limpiamos query params o fragmentos
    const cleanUrl = url.split('?')[0].split('#')[0];

    // El ítem con la ruta más larga que coincida gana (más específico primero)
    let bestMatch: MenuItem | null = null;
    for (const item of this.menuItems) {
      if (cleanUrl === item.ruta || cleanUrl.startsWith(item.ruta + '/')) {
        if (!bestMatch || item.ruta.length > bestMatch.ruta.length) {
          bestMatch = item;
        }
      }
    }
    this.activeRoute = bestMatch ? bestMatch.ruta : '';
  }

  isActive(ruta: string): boolean {
    return this.activeRoute === ruta;
  }

  navigate(item: MenuItem): void {
    this.router.navigate([item.ruta]);
  }

  closeSession() {
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }

  onProfileClick(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  goToConfig(): void {
    this.profileMenuOpen = false;
    this.router.navigate(['/dashboard/config']);
  }
}
