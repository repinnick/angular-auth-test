import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../interfaces';

@Pipe({
  name: 'dateSort',
  pure: false,
})
export class SortPipe implements PipeTransform {
  transform(posts: Post[], option: boolean): Post[] {
    if (posts) {
      posts.sort((first: Post, second: Post) => option ? second.date - first.date : first.date - second.date);
    }
    return posts;
  }
}
