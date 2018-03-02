import { Component, OnInit } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatDialog } from '@angular/material';
import { Router } from '@angular/router'
import { FullUser } from './_models/full-user';
import { RegisterDialog } from './dialogs/register-dialog';
import { LoginDialog } from './dialogs/login-dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  isLoggedIn = false;
  onMainScreen = true;
  currentUser: FullUser;

  pullingPosts: boolean;
  postsError: boolean;

  constructor(private dialog: MatDialog, public button: MatButtonModule,
    public toolbar: MatToolbarModule, private router: Router) {

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
      width: '300px',
      height: '350px',
      data: {username: '', password: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result && result.currentUser) {
        this.currentUser = result.currentUser;
        console.log(result.currentUser);
        this.isLoggedIn = true;
      }
      window.location.reload();
    });

  }

  openLoginDialog(): void {
    let dialogRef = this.dialog.open(LoginDialog, {
      width: '300px',
      height: '270px',
      data: {username: '', password: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result && result.currentUser) {
        this.currentUser = result.currentUser;
        this.isLoggedIn = true;
      }
      window.location.reload();
    });
  }

  post(): void {
    this.onMainScreen = false;
    this.router.navigate(['post']);
  }

  home(): void {
    this.onMainScreen = true;
    this.router.navigate(['']);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    window.location.reload();
  }



}
