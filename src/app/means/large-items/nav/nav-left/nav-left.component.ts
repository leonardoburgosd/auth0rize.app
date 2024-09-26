import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit {

  constructor(private router: Router,private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.cookieService.deleteAll();
    this.router.navigate(['login']);
  }
}
