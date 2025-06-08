import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
import { createDomainRequest } from 'src/app/Data/dto/user/request/createDomainRequest';
import { getDomainResponse } from 'src/app/Data/dto/user/response/getDomainResponse';
import { domainServices } from 'src/app/Data/services/domainServices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
  public domains: getDomainResponse[] = [];
  public newDomain: createDomainRequest = new createDomainRequest();
  public formGroup!: FormGroup;
  public isModalCreateView: boolean = false;
  public isLoadingCreate: boolean = false;

  constructor(private formBuilder: FormBuilder, private domain: domainServices) { }

  ngOnInit(): void {
    this.getDomain();
    this.validacionFormaulario();
  }

  private validacionFormaulario = () =>
    this.formGroup = this.formBuilder.group({
      name: [this.newDomain.name, [Validators.required, Validators.min(20)]]
    });

  getDomain() {
    this.domain.get$().then(res => {
      if (res.success) {
        this.domains = res.data;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en la respuesta',
          text: res.message
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

  openModalCreate() {
    this.isModalCreateView = !this.isModalCreateView;
  }

  deleteDomain(id: number) {
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
        this.domain.delete$(id).then(res => {
          if (res.success) {

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error en la respuesta',
              text: res.message
            });
          }
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error no controlado',
            text: MessageDefault.errorConexion
          })
        }).finally(() => this.domains = this.domains.filter(d => d.id !== id));
      }
    });
  }

  createDomain(domain: createDomainRequest) {
    this.isLoadingCreate = true;
    this.domain.create$(domain)
      .then(res => {
        if (res.success) {
          this.domains.push({ id: res.data.id, default: false, name: domain.name, code: res.data.code });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error en la respuesta',
            text: res.message
          });
        }
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error no controlado',
          text: MessageDefault.errorConexion
        });
      }).finally(() => {
        this.openModalCreate();
        this.newDomain = new createDomainRequest();
        this.isLoadingCreate = false;
      });
  }

  copyCode(code: string) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).then(
        () => {
          console.log('Código copiado.');
        },
        (err) => {
          console.error('Error al copiar.: ', err);
        }
      );
    }
  }
}
