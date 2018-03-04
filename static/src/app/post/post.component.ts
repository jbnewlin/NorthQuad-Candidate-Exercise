import { Component } from '@angular/core';
import { FullUser } from '../_models/full-user';

@Component({
  selector: 'postComponent',
  templateUrl: 'post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  isLoggedIn: boolean;
  currentUser: FullUser;

  constructor() {

  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') == null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }
}
