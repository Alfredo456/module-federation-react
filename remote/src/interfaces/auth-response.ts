import {Usr} from "./usr";

export interface AuthResponse {

  token: string;
  user: Usr;
}
