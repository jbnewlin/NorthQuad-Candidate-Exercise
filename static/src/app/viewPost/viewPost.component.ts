import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Review } from '../_models/review';
import { FullUser } from '../_models/full-user'
import { PostsService} from '../_services/posts.service';
import { DataService } from '../_services/DataService'

@Component({
  selector: 'viewPostComponent',
  templateUrl: 'viewPost.component.html',
  styleUrls: ['./viewPost.component.css']
})
export class ViewPostComponent implements OnInit {

  private post: Review;
  private postID: number;
  private postError: boolean;
  private isLoggedIn: boolean;
  private pullingPost = true;
  currentUser: FullUser;

  constructor(private route: ActivatedRoute, private postsService: PostsService) {
    this.post = {
      id: 0,
      game: "",
      username: "",
      rating: 0,
      review: "",
      time: 0
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postID = Number.parseInt(params['id']);
      console.log("ID: " + this.postID);
      this.loadPost(this.postID);
    });
    if (localStorage.getItem('currentUser') == null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  }

  loadPost(id: number) {
    this.postsService.getById(id)
      .subscribe(
      data => {
        this.post = data;
        this.postError = false;
      },
      error => {
        console.log("Getting sublets issue " + error);
        this.postError = true;
      }
      );
      this.pullingPost = false;
  }

}
