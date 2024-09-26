import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
import { createApplicationRequest } from 'src/app/Data/dto/user/request/createApplicationRequest';
import { getApplicationResponse } from 'src/app/Data/dto/user/response/getApplicationResponse';
import { applicationServices } from 'src/app/Data/services/applicationServices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  public formGroup!: FormGroup;
  public isModalCreateView: boolean = false;
  public newApplication: createApplicationRequest = new createApplicationRequest();
  public isLoadingCreate: boolean = false;
  public applications: getApplicationResponse[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private application: applicationServices) { }

  ngOnInit(): void {
    this.getApplication();
    this.validacionFormaulario();
  }

  private validacionFormaulario = () =>
    this.formGroup = this.formBuilder.group({
      name: [this.newApplication.name, [Validators.required, Validators.min(3)]],
      description: [this.newApplication.description]
    });

  openModalCreate() {
    this.isModalCreateView = !this.isModalCreateView;
  }

  getApplication() {
    this.application.get$().then(res => {
      if (res.success) {
        this.applications = res.data;
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error no controlado',
        text: MessageDefault.errorConexion
      });
    }).finally();
  }

  deleted(id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Deseas eliminar esta aplicacion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
      background: "#111827",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        this.application.deleted$(id).then(res => {
          if (res.success) {
            Swal.fire({
              title: "Eliminado correctamente",
              text: "Aplicacion ah sido eliminada.",
              icon: "success",
              background: "#111827",
              color: "#ffffff",
            });
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Atención.',
              text: res.message
            })
          }
        })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Error no controlado',
              text: MessageDefault.errorConexion
            });
          }).finally(() => this.applications = this.applications.filter(a => a.id !== id));
      }
    });
  }

  createApplication(newApplication: createApplicationRequest) {
    this.isLoadingCreate = true;
    this.application.create$(newApplication).then(res => {
      if (res.success) {
        const addApplication = new getApplicationResponse();
        addApplication.id = res.data.id;
        addApplication.name = newApplication.name;
        addApplication.code = res.data.code;
        addApplication.description = newApplication.description;
        this.applications.push(addApplication);
        this.newApplication = new createApplicationRequest();
        this.isModalCreateView = false;
      }
      else {
        Swal.fire({
          icon: 'warning',
          title: 'Atención.',
          text: res.message
        })
      }
    })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error no controlado',
          text: MessageDefault.errorConexion
        });
      })
      .finally(() => this.isLoadingCreate = false);
  }
}
