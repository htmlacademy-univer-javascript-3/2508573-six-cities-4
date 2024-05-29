import { authSlice, AuthState } from './AuthSlice';
import { AuthorizationStatus } from '../../Constants';
import { generateUser } from '../../mocks/User';
import { checkAuthAction } from '../ApiActions';

describe('Auth slice', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = authSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it("should set user and authorization status with 'checkAuth' fulfilled action", () => {
    const user = generateUser();

    const result = authSlice.reducer(
      initialState,
      checkAuthAction.fulfilled(user, '', undefined)
    );

    expect(result.user).toEqual(user);
    expect(result.authorizationStatus).toEqual(AuthorizationStatus.Auth);
  });

  it("should set authorization status to NoAuth with 'checkAuth' rejected action", () => {
    const result = authSlice.reducer(initialState, checkAuthAction.rejected);

    expect(result.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
  });
});
