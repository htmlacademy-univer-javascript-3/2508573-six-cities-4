import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../Constants';
import { User } from '../../entities/User';
import { checkAuthAction, loginAction, logoutAction } from '../ApiActions';
import { dropToken, saveToken } from '../../services/token';

export type AuthState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = user;
        saveToken(user.token);
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        dropToken();
      });
  },
});

export default authSlice.reducer;
