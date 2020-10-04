import { Posts } from './post.entity';

describe('Post', () => {
  it('should be defined', () => {
    expect(new Posts()).toBeDefined();
  });
});
