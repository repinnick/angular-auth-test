import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../interfaces';

@Pipe({
  name: 'answeredUnanswered',
})
export class AnsweredUnansweredPipe implements PipeTransform {
  transform(posts: Post[], option: string): Post[] {
    if (posts) {
      if (option === 'answered') {
        return posts.filter((post: Post) => {
          if (post.comments) {
            return post.comments.find(comment => comment.isDecision === true);
          }
        });
      } else if (option === 'unanswered') {
        return posts.filter((post: Post) => {
          if (post.comments) {
            return post.comments.every(comment => comment.isDecision === false);
          }
          if (!post.comments) {
            return post;
          }
        });
      }
      else {
        return posts;
      }
    }
  }
}
