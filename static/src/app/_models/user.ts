export class User {
  username: string;
  password: string;

  constructor(userData: any) {
    this.username = userData.username;
    this.password = userData.password;
  }
}
