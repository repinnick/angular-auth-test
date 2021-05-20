import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../interfaces';
import {AuthService} from '../services/auth.service';

@Pipe({
  name: 'myQuestions',
  pure: true,
})
export class MyquestionsPipe implements PipeTransform {
  constructor(private authService: AuthService) {
  }
  transform(posts: Post[], option: boolean): Post[] {
   if (posts && option) {
     return posts.filter(post => post.author === this.authService.user.email);
   }
   return posts;
  }
}
