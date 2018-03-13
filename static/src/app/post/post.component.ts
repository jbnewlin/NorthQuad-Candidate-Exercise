import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../_services/posts.service';
import { FullUser } from '../_models/full-user';
import { Review } from '../_models/review';


@Component({
  selector: 'postComponent',
  templateUrl: 'post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  isLoggedIn: boolean;
  currentUser: FullUser;
  review: Review;

  constructor(private postsService: PostsService, private router: Router) {
    this.review = {
      post_id: 0,
      username: "",
      game: "",
      rating: 0,
      review: "",
      time: 0
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') == null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  onSubmit(): void {
    this.review.username = this.currentUser.username;
    this.review.time = new Date().getTime();
    console.log("Here " + JSON.stringify(this.review));
    this.postsService.createPost(this.review)
      .subscribe(
        data => {
          console.log("I'm here: " + data);
          // this.router.navigateByUrl('/view-post/' + data.post_id)
        });

  }
}
