import { Validators, ValidatorFn, FormGroup, ValidationErrors, PatternValidator } from '@angular/forms';

export class CheckValidation {

  Status: boolean = null;
  fakeCode = ["0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999"]
  codemelli

  constructor() { }

  fName(): any {
    return [
      Validators.required
    ];
  }

  lName(): any {
    return [
      Validators.required
    ];
  }

  userName(): any[] {
    return [
      Validators.required,
      Validators.pattern('^[a-z0-9_-]{8,15}$')
    ];
    // return [Validators.required, Validators.pattern('[a-zA-Z]*')];
  }

  phoneNumber(): any {
    return [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
    ];
  }

  address(): any {
    return [
      Validators.required
    ];
  }

  email(): any[] {
    return [
      Validators.required,
      Validators.email
    ];
  }

  password(): any[] {
    return [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
    ];
  }

  password2(): any {
  }

  grade(): any {
    return [
      Validators.required
    ];
  }

  datePicker(): any {
    return [
      Validators.required
    ];
    // Validators.pattern('/^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|([1-2][0-9])|(0[1-9]))))$/')
  }
  nationalCode(): any {

  }

  checkCode() {
    this.Status = this.check()
  }

  check() {
    let Arr = Array.from(this.codemelli)
    if (this.fakeCode.some(e => e == this.codemelli)) {
      return false
    } else if (Arr.length != 10) {
      return false
    } else {
      let Sum = 0;
      let Last;

      for (let i = 0; i < 9; i++) {
        Sum += +Arr[i] * (10 - i)
      }
      let divideRemaining = Sum % 11;
      if (divideRemaining < 2) {
        Last = divideRemaining;
      } else {
        Last = 11 - (divideRemaining);
      }
      let n = Arr[9];
      return Last == n
    }
  }
}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('password2').value) {
    return null;
  } else {
    return { passwordMismatch: true };
  }
};
