export class FullUser {
  id: number;
  username: string;
  name: string;
  password: string;

  constructor(userData: any) {
    this.id = userData.id;
    this.username = userData.username;
    this.name = userData.name;
    this.password = userData.password;
  }
}
