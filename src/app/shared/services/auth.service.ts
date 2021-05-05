import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {
  }

  get token(): string {
    return "";
  }


  logout(){

  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  setToken(res) {
    console.log(res);
  }
}
