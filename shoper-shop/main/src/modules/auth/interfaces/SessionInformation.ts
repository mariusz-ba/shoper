export interface SessionInformation {
  loggedIn: boolean;
  user: {
    id: number;
    email: string;
  }
}
