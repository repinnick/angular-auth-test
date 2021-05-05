import {Injectable} from "@angular/core";
import firebase from "firebase/app";
import {User} from "../interfaces";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";


// import {HttpClient} from "@angular/common/http";
// import {environment} from "../../../environments/environment";
// import {tap} from "rxjs/operators";

@Injectable(
  {providedIn: 'root'}
)
export class AuthService {

  user: User;

  constructor(public readonly angularFireAuth: AngularFireAuth, private router: Router) {
  }

  signIn(user: User){
    return this.handlerResponseReject(
      this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password),
    )
  }

  signUp(user: User) {
      return this.handlerResponseReject(
        this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password),
      )
  }

  googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.handlerResponseReject(
      this.angularFireAuth.signInWithPopup(provider)
    )
  }

  facebookAuth() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.handlerResponseReject(
      this.angularFireAuth.signInWithPopup(provider)
    )
  }

  githubAuth() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.handlerResponseReject(
      this.angularFireAuth.signInWithPopup(provider)
    )
  }

  logout() {
    this.angularFireAuth.signOut();
    // localStorage.clear();
  }

  handlerResponseReject(promise: Promise<any>): Promise<any>{
    return promise
      .then(result => {
        this.user = {
          email: result.user.email,
          uid: result.user.uid,
        }
        console.log(this.user)
        this.router.navigate(['/'])
        // localStorage.setItem('isAuth', 'true')
      })
      .catch(err => {
        console.log("Message: ", err.message)
        this.alertErrorMessage(err);
      });
  }

  alertErrorMessage(err): void {
    const code: string = err.code;
    let message: any = code.split('/')
    message = message[1].split('-').join(" ")
    window.alert(message)
  }
}
