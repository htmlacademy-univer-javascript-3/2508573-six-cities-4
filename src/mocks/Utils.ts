import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../entities/State';
import { createAPI } from '../services/api';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
