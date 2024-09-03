import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MessageDefault } from 'src/app/Data/common/messageDefault';
import { RestResponse } from 'src/app/Data/common/restResponse';
import { authServices } from 'src/app/Data/services/authServices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-email',
  templateUrl: './recover-email.component.html',
  styleUrls: ['./recover-email.component.scss']
})
export class RecoverEmailComponent implements OnInit {
  public formGroup!: FormGroup;
  databasic: any;
  message: string = '';
  private emailValue: string = '';
  public cargando: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: authServices
  ) { }

  ngOnInit(): void {
    this.validacionFormaulario();
  }

  private validacionFormaulario = () => {
    this.formGroup = this.formBuilder.group({
      email: [this.emailValue, [Validators.required, Validators.min(3), Validators.email]]
    });
  }

  recovery = (email: string) => {
    this.cargando = true;
    const verify: Observable<RestResponse<boolean>> = this.authService.recoveryByEmail$(email);
    verify.subscribe({
      next: (res) => {
        if (res.success) {
          Swal.fire({
            icon: 'success',
            title: 'Email válido.',
            text: res.message
          })
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Atención.',
            text: res.message
          })
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: MessageDefault.errorConexion,
          text: err.toString()
        });
      },
      complete: () => {
        this.cargando = false;
      }
    },
    )
  }
}
