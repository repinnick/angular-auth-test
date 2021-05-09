import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {getResponseId, Post} from "../interfaces";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  createPost(post: Post): Observable<Post>{
    return this.httpClient.post('https://angular-auth-11940-default-rtdb.firebaseio.com/posts.json', post)
      .pipe(map((response: getResponseId) => {
        return {
          ...post,
          id: response.name,
        }
      }))
  }

  getAllPosts(){}

  deletePost(){}


}
