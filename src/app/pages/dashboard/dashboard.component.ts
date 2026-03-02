import { Component, OnInit, HostListener } from '@angular/core';

interface Notification {
  id: number;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  sidebarOpen = true;
  notificationsOpen = false;

  notifications: Notification[] = [
    {
      id: 1,
      icon: 'fas fa-user-plus',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      title: 'Nuevo usuario registrado',
      message: 'Carlos Rodríguez se unió al dominio principal.',
      time: 'Hace 5 min',
      read: false
    },
    {
      id: 2,
      icon: 'fas fa-globe',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Dominio actualizado',
      message: 'El dominio "corp.example.com" fue modificado.',
      time: 'Hace 23 min',
      read: false
    },
    {
      id: 3,
      icon: 'fas fa-shield-alt',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      title: 'Alerta de seguridad',
      message: 'Se detectaron 3 intentos fallidos de inicio de sesión.',
      time: 'Hace 1 h',
      read: false
    },
    {
      id: 4,
      icon: 'fas fa-check-circle',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      title: 'Permiso aprobado',
      message: 'El acceso a la aplicación "Portal HR" fue concedido.',
      time: 'Hace 2 h',
      read: true
    },
    {
      id: 5,
      icon: 'fas fa-times-circle',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      title: 'Dominio eliminado',
      message: 'El dominio "test.example.com" fue eliminado por el administrador.',
      time: 'Hace 3 h',
      read: true
    },
    {
      id: 6,
      icon: 'fas fa-key',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Token de API generado',
      message: 'Se generó un nuevo token de acceso para la aplicación "Mobile App".',
      time: 'Ayer',
      read: true
    },
    {
      id: 7,
      icon: 'fas fa-user-times',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      title: 'Usuario desactivado',
      message: 'La cuenta de "ana.garcia@corp.com" fue desactivada.',
      time: 'Ayer',
      read: true
    },
  ];

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  constructor() { }

  ngOnInit(): void { }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onProfileClick(): void {
    console.log('Profile clicked');
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('Searching for:', target.value);
  }

  onNotificationClick(): void {
    this.notificationsOpen = !this.notificationsOpen;
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
  }

  markAsRead(id: number): void {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.read = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('#notification-panel') && !target.closest('#notification-btn')) {
      this.notificationsOpen = false;
    }
  }
}
