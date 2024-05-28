import { authSlice, changeAuthStatus, setUser, AuthState } from './AuthSlice';
import { AuthorizationStatus } from '../../Constants';
import { generateUser } from '../../mocks/User';

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

    const result = authSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change authorization status with \'changeAuthStatus\' action', () => {
    const authStatus = AuthorizationStatus.Auth;

    const result = authSlice.reducer(initialState, changeAuthStatus(authStatus));

    expect(result.authorizationStatus).toEqual(authStatus);
  });

  it('should set user with \'setUser\' action', () => {
    const user = generateUser();

    const result = authSlice.reducer(initialState, setUser(user));

    expect(result.user).toEqual(user);
  });
});
