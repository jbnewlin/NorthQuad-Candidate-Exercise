import { Injectable } from '@angular/core';
import { Review } from '../_models/review';

@Injectable()
export class DataService {
  constructor() { }

  public posts: Review;

}
