import { Component, OnInit } from '@angular/core';
import { dashboardServices } from '../../Data/services/dashboardServices';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sidebarOpen = true

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen
  }

  onProfileClick(): void {
    console.log("Profile clicked")
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement
    console.log("Searching for:", target.value)
  }

  onNotificationClick(): void {
    console.log("Notification clicked")
  }
}
