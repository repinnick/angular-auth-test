import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getResponseId, Post} from '../interfaces';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  createPost(post: Post): Observable<Post> {
    return this.httpClient.post(`${environment.databaseUrl}/posts.json`, post)
      .pipe(
        map((response: getResponseId) => {
          return {
            ...post,
            id: response.name,
          };
        }));
  }

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get(`${environment.databaseUrl}/posts.json`)
      .pipe(
        map((response) => {
          return Object.keys(response)
            .map((key) => {
              return {
                ...response[key],
                id: key,
              };
            });
        })
      );
  }

  deletePost(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.databaseUrl}/posts/${id}.json`);
  }

  getPostById(id: string): Observable<Post> {
    return this.httpClient.get(`${environment.databaseUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => !post ? null : {...post, id}));
  }

  update(post: Post): Observable<Post> {
    return this.httpClient.patch<Post>(`${environment.databaseUrl}/posts/${post.id}.json`, post);
  }

  generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
