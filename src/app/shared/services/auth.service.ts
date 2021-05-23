import {Injectable} from '@angular/core';
import firebase from 'firebase/app';
import {User} from '../interfaces';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable(
  {providedIn: 'root'}
)
export class AuthService {

  user: User;
  isAdmin: boolean;

  constructor(private angularFireAuth: AngularFireAuth,
              private httpClient: HttpClient) {
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
    localStorage.clear();
    return this.angularFireAuth.signOut();
  }

  handlerResponse(promise: Promise<any>): Promise<any> {
    return promise
      .then(result => {
        return this.user = {
          email: result.user.email,
          uid: result.user.uid,
        };
      });
  }

  getCurrentUser(): Observable<User> {
    return this.angularFireAuth.authState
      .pipe(
        map((result: User) => {
          if (result) {
            return this.user = {
              ...result,
            };
          }
        }));
  }

  checkAdmin(user: User): Observable<any> {
    return this.httpClient.get(`${environment.databaseUrl}/admins.json`)
      .pipe(map(result => {
        user.isAdmin = !!result['email'].filter(e => e === user.email);
        return this.user = {...user};
      }));
  }

  getAdminAndCurrentUser(): Observable<any> {
    return this.getCurrentUser()
      .pipe(switchMap((user: User) => {
        if (user) {
          return this.checkAdmin(user);
        }
        else {
          return of(user);
        }
      }));
  }
}
