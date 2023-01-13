export interface User {
  firstname: string;
  lastname: string;
  email: string;
  department: string;
}

export interface UserState {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  department: number;
}
