import {
  AbstractControl,
  FormControl, ValidationErrors, ValidatorFn
} from '@angular/forms';

export function isAdult(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let getYear: number = new Date().getFullYear();
    let diference: number = getYear - new Date(control.get('birthday')?.value).getFullYear();
    if (diference < 18)
      return { adult: true };
    else return null;
  }
}

export class CustomValidations {

  static passwordConfirm(passwordName: string, passwordConfirmName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get(passwordName)?.value;
      const passwordConfirm = control.get(passwordConfirmName)?.value;
      if (!password || !passwordConfirm) {
        return null;
      }

      if (password.value !== passwordConfirm.value) {
        return { fieldsMismatch: true };
      }

      return null;
    };
  }

  static unambiguousRoleValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.get('passwordName')?.value;
    const passwordConfirm = control.get('passwordConfirmName')?.value;
    if (!password || !passwordConfirm) {
      return null;
    }

    if (password.value !== passwordConfirm.value) {
      return { fieldsMismatch: true };
    }

    return null;
  };

}


