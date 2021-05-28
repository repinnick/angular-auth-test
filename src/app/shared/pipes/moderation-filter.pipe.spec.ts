import {ModerationFilterPipe} from './moderation-filter.pipe';
import {Post} from '../interfaces';

const posts: Post[] = [
  {
    author: 'check.point@gmail.com',
    date: 1621077287603,
    id: '-M_jj4UXKRiIL5A78ZvS',
    isModeration: false,
    tags: ['JavaScript', 'Net'],
    text: 'First post',
    title: 'First post',
  },
  {
    author: 'check.point9917@gmail.com',
    date: 1621070000000,
    id: '-M_jj4UXKRiIL5A78ZvS',
    isModeration: true,
    tags: ['Net'],
    text: 'Second Post',
    title: 'Second Post',
  },
];

const postsTrue: Post[] = [
  {
    author: 'check.point9917@gmail.com',
    date: 1621070000000,
    id: '-M_jj4UXKRiIL5A78ZvS',
    isModeration: true,
    tags: ['Net'],
    text: 'Second Post',
    title: 'Second Post',
  },
];

describe('ModerationFilterPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new ModerationFilterPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return posts where isModeration = true', () => {
    expect(pipe.transform(posts, true)).toEqual(postsTrue);
  });
  it('should return all posts when option is equal to false', () => {
    expect(pipe.transform(posts, false)).toEqual(posts);
  });
  it('should return all posts when option is equal to undefined', () => {
    expect(pipe.transform(posts, undefined)).toEqual(posts);
  });
});
