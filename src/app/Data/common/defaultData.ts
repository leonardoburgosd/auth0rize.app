import { FormControl } from '@angular/forms';

export class defaultData {
  static lowestBirthday(): string {
    let getYear: number = new Date().getFullYear() - 18;
    return getYear + '-01-01';
  }

  static isAdult(control: FormControl) {
    let getYear: number = new Date().getFullYear();
    let diference: number = getYear - new Date(control.value).getFullYear();
    return diference >= 18
      ? null
      : {
          validateDate: {
            valid: false,
          },
        };
  }
}
