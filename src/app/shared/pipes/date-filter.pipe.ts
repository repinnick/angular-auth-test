import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../interfaces';

@Pipe({
  name: 'dateFilter',
  pure: false,
})
export class DateFilterPipe implements PipeTransform {
  transform(posts: Post[], option: number): Post[] {
    if (posts && +option) {
      const DAY = 24 * 3600 * 1000;
      return posts.filter(post => +new Date() - post.date < DAY * option);
    }
    return posts;
  }
}
