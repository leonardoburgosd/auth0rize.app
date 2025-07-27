import { Component, OnInit } from '@angular/core';

interface StatCard {
  title: string
  value: string
  icon: string
  iconBg: string
  iconColor: string
}

interface ActivityItem {
  id: number
  user: string
  action: string
  time: string
  timestamp: string
}

@Component({
  selector: 'app-abstract',
  templateUrl: './abstract.component.html',
  styleUrls: ['./abstract.component.scss']
})
export class AbstractComponent implements OnInit {
  statCards: StatCard[] = [
    {
      title: "Total Usuarios",
      value: "2,543",
      icon: "fas fa-users",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-500",
    },
    {
      title: "Total de dominios",
      value: "3",
      icon: "fa-solid fa-layer-group",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Sesiones exitosas",
      value: "1,234",
      icon: "fa-solid fa-check",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      title: "Sesiones fallidas",
      value: "3.24%",
      icon: "fa-solid fa-xmark",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
  ]

  recentActivities: ActivityItem[] = [
    { id: 1, user: "Usuario 1", action: "realizó una acción", time: "Hace 2 minutos", timestamp: "12:34 PM" },
    { id: 2, user: "Usuario 2", action: "realizó una acción", time: "Hace 5 minutos", timestamp: "12:31 PM" },
    { id: 3, user: "Usuario 3", action: "realizó una acción", time: "Hace 8 minutos", timestamp: "12:28 PM" },
    { id: 4, user: "Usuario 4", action: "realizó una acción", time: "Hace 12 minutos", timestamp: "12:24 PM" },
    { id: 5, user: "Usuario 5", action: "realizó una acción", time: "Hace 15 minutos", timestamp: "12:21 PM" },
  ]

  sections = [1, 2, 3, 4, 5]
  cards = [1, 2, 3]

  constructor() { }

  ngOnInit(): void {
  }

}
