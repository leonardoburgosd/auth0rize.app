import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-factor-email',
  templateUrl: './two-factor-email.component.html',
  styleUrls: ['./two-factor-email.component.scss']
})
export class TwoFactorEmailComponent implements OnInit {
  databasic: any;

  password: string = '';
  message: string = '';
  redirecturl!: any;
  secretkey!: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  validar() {
    this.router.navigate(['dashboard']);
  }
}
