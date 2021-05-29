import { TestBed } from '@angular/core/testing';
import {PostService} from './post.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Post} from '../interfaces';

const dataPosts: Post[] = [
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

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
