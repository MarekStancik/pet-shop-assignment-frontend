import { UserAuthGuard } from './user-auth-guard';

describe('UserAuthGuard', () => {
  it('should create an instance', () => {
    expect(new UserAuthGuard()).toBeTruthy();
  });
});
