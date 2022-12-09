import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-up',
  templateUrl: './nav-up.component.html',
  styleUrls: ['./nav-up.component.scss']
})
export class NavUpComponent implements OnInit {
  img:string='https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ';
  name:string='James Smith';
  constructor() { }

  ngOnInit(): void {
  }

}
