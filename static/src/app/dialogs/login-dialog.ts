import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
})
export class LoginDialog {

  options: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  validCheck: boolean[] = [false, false];

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    formField: MatFormFieldModule) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getEmailErrorMessage() {
    let returnValue = '';
    if (this.email.hasError('required'))
      returnValue = 'You must enter an email';
    else if (this.email.hasError('email'))
      returnValue = 'Not a valid email';
    if (returnValue == '')
      this.validCheck[0] = true;
    else
      this.validCheck[0] = false;
    return returnValue;
  }

  getPasswordErrorMessage() {
    let returnValue = '';
    if (this.password.hasError('required'))
      returnValue = 'You must enter an password';
    else if (this.password.hasError('minlength'))
      returnValue = 'Password requires at least 6 characters';
    if (returnValue == '')
      this.validCheck[1] = true;
    else
      this.validCheck[1] = false;
    return returnValue;
  }

  getLoginDisabledValue() {
    if (this.validCheck[0] && this.validCheck[1]) {
      return false;
    }
    return true;
  }

}
