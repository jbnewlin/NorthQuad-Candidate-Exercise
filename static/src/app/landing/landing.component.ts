import { Component } from '@angular/core';
import { FullUser } from '../_models/full-user'
import { PostsService} from '../_services/posts.service';
import { DataService } from '../_services/DataService'

@Component({
  selector: 'landingComponent',
  templateUrl: 'landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  isLoggedIn: boolean;
  currentUser: FullUser;
  pullingPosts: boolean;
  postsError: boolean;

  constructor(private postsService: PostsService, private dataService: DataService) {

  }

  ngOnInit() {

    if (localStorage.getItem('currentUser') == null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.loadAllPosts();
  }

  viewPost(id): void {
    console.log(id);
  }

  loadAllPosts() {
    this.pullingPosts = true;
    this.postsService.getAll()
      .subscribe(
        data => {
          this.pullingPosts = false;
          this.dataService.posts = data;
          this.postsError = false;
          console.log(this.dataService.posts);
        },
        error => {
          this.pullingPosts = false;
          console.log('Getting sublets issue ' + error);
          this.postsError = true;
        }
      );
  }
}
