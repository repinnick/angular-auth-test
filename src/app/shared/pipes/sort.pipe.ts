import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../interfaces';

@Pipe({
  name: 'dateSort',
})
export class SortPipe implements PipeTransform {
  transform(posts: Post[], options: boolean): Post[] {
    if (posts) {
      if (options) {
        return posts.sort((first: Post, second: Post) => second.date - first.date);
      } else {
        return posts.sort((first: Post, second: Post) => first.date - second.date);
      }
    }
    else{
      return;
    }
  }
}
