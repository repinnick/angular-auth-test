import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../interfaces';

@Pipe({
  name: 'tagFilter',
  pure: false,
})
export class TagsSortPipe implements PipeTransform {
  transform(posts: Post[], options: string[]): Post[] {
    if (posts) {
      if (options.length) {
        return posts.filter((post) => options.every((option) => post.tags.indexOf(option) !== -1));
      }
      return posts;
    }
  }
}
