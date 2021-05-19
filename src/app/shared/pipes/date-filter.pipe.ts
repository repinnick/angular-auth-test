import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../interfaces';

@Pipe({
  name: 'dateFilter',
  pure: false,
})
export class DateFilterPipe implements PipeTransform {
  transform(posts: Post[], option: string): Post[] {
    if (posts){
      if (option) {
        const DAY = 24 * 3600 * 1000;
        let period = 0;
        if (option === 'day') {
          period = DAY;
        }
        else if (option === 'last week'){
          period = DAY * 7;
        }
        else if (option === 'last month'){
          period = DAY * 31;
        }
        else if (option === 'all time') {
          return posts;
        }
        return posts.filter(post => +new Date() - post.date < period);
      }
      return posts;
    }
  }
}
