import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ErrorsState = { messages: string[] };

const initialState: ErrorsState = { messages: [] };

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addErrorMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
    removeErrorMessage: (state, action: PayloadAction<number>) => {
      state.messages.splice(action.payload, 1);
    },
  },
});

export const { addErrorMessage, removeErrorMessage } = errorSlice.actions;

export default errorSlice.reducer;
