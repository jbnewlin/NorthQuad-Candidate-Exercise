import { Component, OnInit } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatDialog } from '@angular/material';
import { FullUser } from './_models/full-user';
import { RegisterDialog } from './dialogs/register-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  isLoggedIn = false;
  currentUser: FullUser;

  constructor(private dialog: MatDialog, public button: MatButtonModule,
    public toolbar: MatToolbarModule) {

  }

  ngOnInit() {
    if (localStorage.getItem('currentUser') == null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  openRegisterDialog(): void {
    let dialogRef = this.dialog.open(RegisterDialog, {
      width: '500px',
      height: '500px',
      data: {firstname: '', lastname: '', password: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
