import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Review } from '../_models/review';
import 'rxjs/add/operator/map';

import { User } from "../_models/user";

@Injectable()
export class PostsService {
  baseURL: string;

    constructor(private http: Http) {
        this.baseURL = 'http://localhost:5000';
    }

    getHeaders() {
        const headers = new Headers();
        // headers.append("Content-Type", "text/xml");
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({ headers: headers });
        console.log(JSON.stringify(options));
        return options;
    }

    getAll() {
      return this.http.get(this.baseURL + '/posts', this.getHeaders()).map((response: Response) => {
        return response.json();
      });
    }

    getById(id: number) {
      return this.http.get(this.baseURL + '/view-post/' + id, this.getHeaders()).map((response: Response) => {
        return response.json();
      });
    }

    createPost(review: Review) {
      return this.http.post(this.baseURL + '/post', review, this.getHeaders()).map((response: Response) => {
        return response.json();
      });
    }

  }
