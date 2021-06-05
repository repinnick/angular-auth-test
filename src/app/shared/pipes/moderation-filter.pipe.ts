import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../interfaces';

@Pipe({
  name: 'onModeration',
  pure: false,
})
export class ModerationFilterPipe implements PipeTransform{
  transform(posts: Post[], option: boolean): Post[] {
    if (posts && option) {
      return posts.filter(post => post.isModeration === true);
    }
    return posts;
  }
}
