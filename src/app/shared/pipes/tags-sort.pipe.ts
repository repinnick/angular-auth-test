import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../interfaces';

@Pipe({
  name: 'tagSort',
})
export class TagsSortPipe implements PipeTransform {
  transform(posts: Post[], options = ''): Post[] {
    if (posts) {
      return posts;
      // if (options === '') {
      //   return posts;
      // }
      // return posts.map((post: Post) => {
      //   if (post.tags.indexOf(options) !== -1) {
      //     return post;
      //   }
      // });
    }
  }
}
