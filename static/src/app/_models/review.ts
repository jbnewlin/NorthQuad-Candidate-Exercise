export class Review {
  id: number;
  game: string;
  username: string;
  rating: number;
  review: string;

  constructor(id: number, game: string, username: string, rating: number, review: string) {
    this.id = id;
    this.game = game;
    this.username = username;
    this.rating = rating;
    this.review = review;
  }
}
