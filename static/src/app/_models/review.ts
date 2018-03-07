export class Review {
  id: number;
  game: string;
  username: string;
  rating: number;
  review: string;
  time: number;

  constructor(id: number, game: string, username: string, rating: number, review: string, time: number) {
    this.id = id;
    this.game = game;
    this.username = username;
    this.rating = rating;
    this.review = review;
    this.time = time;
  }
}
