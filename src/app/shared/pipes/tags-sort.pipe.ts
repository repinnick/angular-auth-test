import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../interfaces';

@Pipe({
  name: 'tagFilter',
})
export class TagsSortPipe implements PipeTransform {
  transform(posts: Post[], option: string): Post[] {
    if (posts) {
      if (!option) {
        return posts;
      }
      return posts.filter((post: Post) => {
        if (post.tags.indexOf(option) !== -1) {
          return post;
        }
      });
    }
  }
}
