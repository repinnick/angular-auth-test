import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post} from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  createPost(post: Post){}

  getAllPosts(){}

  deletePost(){}


}
