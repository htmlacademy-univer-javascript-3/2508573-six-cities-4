import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../Constants';
import { User } from '../../entities/User';

type AuthState = {
  authorizationStatus: AuthorizationStatus;
  user?: User;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuthStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const { changeAuthStatus, setUser } = authSlice.actions;
export default authSlice.reducer;
