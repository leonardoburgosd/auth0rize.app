import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
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
  constructor(private formBuilder: FormBuilder, private domain: domainServices) { }

  ngOnInit(): void {
    this.getDomain();
  }

  getDomain() {
    this.domain.get$().then(res => {
      if (res.success) {
        this.domains = res.data;
      }else{
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
}
