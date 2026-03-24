import { Component, OnInit } from '@angular/core';
import { dashboardServices } from '../../../Data/services/dashboardServices';
import Swal from 'sweetalert2';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
import { StatCard } from './statCard.interface';
import { ActivityItem } from './activityItem.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-abstract',
    templateUrl: './abstract.component.html',
    styleUrls: ['./abstract.component.scss'],
    standalone: false
})
export class AbstractComponent implements OnInit {
  statCards: StatCard[] = []

  recentActivities: ActivityItem[] = []

  sections = [1, 2, 3, 4, 5]
  cards = [1, 2, 3]

  isDoubleFactorActive: boolean = false;

  constructor(
    private dashboardServices: dashboardServices,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.dashboardServices.get$().then(res => {
      if (res.success) {
        debugger
        this.statCards.push({
          title: "Total Usuarios",
          value: res.data.totalUsers.toString(),
          icon: "fas fa-users",
          iconBg: "bg-teal-100",
          iconColor: "text-teal-500",
        });
        this.statCards.push({
          title: "Total de dominios",
          value: res.data.totalDomains.toString(),
          icon: "fa-solid fa-layer-group",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-500",
        });
        this.statCards.push({
          title: "Sesiones exitosas",
          value: res.data.totalLoginSuccess.toString(),
          icon: "fa-solid fa-check",
          iconBg: "bg-green-100",
          iconColor: "text-green-500",
        });

        this.statCards.push({
          title: "Sesiones fallidas",
          value: res.data.totalLoginFailed.toString(),
          icon: "fa-solid fa-xmark",
          iconBg: "bg-red-100",
          iconColor: "text-red-500",
        });

        res.data.lastHistoryResponse.map(item => {
            const dateObj = new Date(item.date);
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = ((hours + 11) % 12 + 1);
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

            const now = new Date();
            const diffMs = now.getTime() - dateObj.getTime();
            const diffMinutes = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

            let timeAgo = '';
            if (diffMinutes < 60) {
              timeAgo = `Hace ${diffMinutes} minuto${diffMinutes === 1 ? '' : 's'}`;
            } else if (diffHours < 24) {
              timeAgo = `Hace ${diffHours} hora${diffHours === 1 ? '' : 's'}`;
            } else {
              timeAgo = `Hace ${diffDays} día${diffDays === 1 ? '' : 's'}`;
            }

            this.recentActivities.push({
              user: item.userName,
              action: "se autenticó",
              time: timeAgo,
              timestamp: formattedTime
            });
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar datos',
          text: res.message || MessageDefault.errorConexion
        });
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error no controlado',
        text: MessageDefault.errorConexion
      });
    }).finally();
  }

  ngOnInit(): void {
    try {
      const basicData = JSON.parse(this.cookieService.get('basicData'));
      this.isDoubleFactorActive = basicData.isDoubleFactorActive ?? false;
    } catch (error) {
      console.error('Error al obtener basicData:', error);
      this.isDoubleFactorActive = false;
    }
  }

  goToConfig(): void {
    this.router.navigate(['/dashboard/config']);
  }

}
