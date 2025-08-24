import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
import { userServices } from 'src/app/Data/services/userServices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public mensaje: string = "Cargando...";
  public isError: boolean = false;

  public verificado: boolean = false;
  constructor(private userService: userServices,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.verification$().then(res => {
      if (res.success) {
        if (res.data == true) {
          this.router.navigate(['/login']);
          this.isError = false;
        } else {
          this.router.navigate(['/register']);
          this.isError = false;
        }
      } else {
        this.mensaje = res.message;
        this.isError = true;
      }
    }).catch(err => {
      this.mensaje = "Error de conexión con el servidor.";
      this.isError = true;
    })
      .finally(() => this.verificado = false);
  }

  public recargar() {
    window.location.reload();
  }
}
