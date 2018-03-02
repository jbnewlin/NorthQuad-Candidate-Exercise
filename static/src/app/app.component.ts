import { Component, OnInit } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatDialog } from '@angular/material';
import { FullUser } from './_models/full-user';
import { RegisterDialog } from './dialogs/register-dialog';
import { LoginDialog } from './dialogs/login-dialog';
import { PostsService} from './_services/posts.service';
import { DataService } from './_services/DataService'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  isLoggedIn = false;
  currentUser: FullUser;

  pullingPosts: boolean;
  postsError: boolean;

  constructor(private dialog: MatDialog, public button: MatButtonModule,
    public toolbar: MatToolbarModule, private postsService: PostsService,
    private dataService: DataService) {

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

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    window.location.reload();
  }

  viewPost(id): void {

  }

  loadAllPosts() {
    this.pullingPosts = true;
    this.postsService.getAll()
      .subscribe(
        data => {
          this.pullingPosts = false;
          this.dataService.posts = data;
          this.postsError = false;
        },
        error => {
          this.pullingPosts = false;
          console.log('Getting sublets issue ' + error);
          this.postsError = true;
        }
      );
  }

}
