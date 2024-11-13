export  interface SpaceXData {
  id: string;
  name: string;
  url: string;
}

export  interface SpaceXDataDetails {
  id: string;
  title: string;
  date: string;
  url?: string;
  success?: boolean;
  details?: string;
  article?: string;
  webcast?: string;
  wikipedia?: string;
}

export interface User{
  email: string;
}

export interface UserLogIn extends User{
  password: string;
}

export interface UserToken extends User{
  token: string;
}
