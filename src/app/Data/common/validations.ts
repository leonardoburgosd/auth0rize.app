import {
  AbstractControl,
  FormControl, ValidationErrors, ValidatorFn
} from '@angular/forms';

export function isAdult():ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null =>{
    let getYear: number = new Date().getFullYear();
    let diference: number = getYear - new Date(control.get('birthday')?.value).getFullYear();
    if (diference < 18)
      return { adult: true };
    else return null;
  }
}

export function passwordConfirm(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;
    return password !== passwordConfirm ? { match: true } : null;
  };
}