import {Injectable} from '@angular/core';
import firebase from 'firebase/app';
import {User} from '../interfaces';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable(
  {providedIn: 'root'}
)
export class AuthService {

  user: User;

  constructor(private angularFireAuth: AngularFireAuth) {
  }

  signIn(user: User): Promise<any> {
    return this.handlerResponse(
      this.angularFireAuth.signInWithEmailAndPassword(user.email, user.password),
    );
  }

  signUp(user: User): Promise<any> {
    return this.handlerResponse(
      this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.password),
    );
  }

  googleAuth(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.handlerResponse(
      this.angularFireAuth.signInWithPopup(provider)
    );
  }

  facebookAuth(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.handlerResponse(
      this.angularFireAuth.signInWithPopup(provider)
    );
  }

  githubAuth(): Promise<any> {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.handlerResponse(
      this.angularFireAuth.signInWithPopup(provider)
    );
  }

  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }

  handlerResponse(promise: Promise<any>): Promise<any> {
    return promise
      .then(result => {
        this.user = {
          email: result.user.email,
          uid: result.user.uid,
        };
      });
  }

  getCurrentUser(): Observable<User> {
    return this.angularFireAuth.authState
      .pipe(map(result => {
          if (result) {
            this.user = {
              email: result.email,
              uid: result.uid
            };
            return this.user;
          }
        }
      ));
  }
}
