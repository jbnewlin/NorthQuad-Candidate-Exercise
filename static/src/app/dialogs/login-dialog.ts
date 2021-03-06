import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FullUser } from '../_models/full-user';
import { User } from '../_models/user';
import { UserService } from "../_services/user.service";

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
})
export class LoginDialog {

  options: FormGroup;
  currentUser: FullUser;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    formField: MatFormFieldModule,
    private userService: UserService) {
      this.data = {
        id: 0,
        username: "",
        name: "",
        password: ""
      }
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
    return returnValue;
  }

  getPasswordErrorMessage() {
    let returnValue = '';
    if (this.password.hasError('required'))
      returnValue = 'You must enter an password';
    else if (this.password.hasError('minlength'))
      returnValue = 'Password requires at least 6 characters';
    return returnValue;
  }

  postResults(loginData) {
    if (loginData == undefined || loginData.email == "" || loginData.password == "") {
      console.log("Fields not valid");
    }
    let user = new User(loginData);
    console.log("Registering user " + JSON.stringify(user));

    this.userService.login(user)
      .subscribe(
        data => {
          if (data == "Failure") {
            console.log("Error creating profile");
            return;
          }
          this.currentUser = new FullUser(loginData);
          if (this.currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.dialogRef.close({'currentUser': this.currentUser});
          }
          console.log(data);
          this.dialogRef.close();
        });
  }

}
