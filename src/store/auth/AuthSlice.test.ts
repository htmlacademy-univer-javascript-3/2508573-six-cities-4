import { authSlice, AuthState } from './AuthSlice';
import { AuthorizationStatus } from '../../Constants';
import { generateUser } from '../../mocks/User';
import { checkAuthAction, loginAction, logoutAction } from '../ApiActions';
import * as tokenStorage from '../../services/token';
import { AuthData } from '../../entities/AuthData';

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

  it('should call "saveToken" once with the received token, set authStatus and user', () => {
    const fakeUser = generateUser();
    const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

    const result = authSlice.reducer(
      initialState,
      loginAction.fulfilled(fakeUser, '', {} as AuthData)
    );

    expect(result.authorizationStatus).toEqual(AuthorizationStatus.Auth);
    expect(result.user).toEqual(fakeUser);
    expect(mockSaveToken).toHaveBeenCalledTimes(1);
    expect(mockSaveToken).toHaveBeenCalledWith(fakeUser.token);
  });

  it('should call "dropToken" once with the received token, clear authStatus and user', () => {
    initialState.authorizationStatus = AuthorizationStatus.Auth;
    initialState.user = generateUser();
    const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

    const result = authSlice.reducer(
      initialState,
      logoutAction.fulfilled
    );

    expect(result.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
    expect(result.user).toBeNull();
    expect(mockDropToken).toHaveBeenCalledTimes(1);
  });
});
