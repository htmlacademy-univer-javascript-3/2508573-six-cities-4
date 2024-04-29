import { useDispatch, useSelector } from 'react-redux';
import { State } from '../entities/State';
import { store } from './Index';

export const useAppSelector = <T>(callback: (state: State) => T) => useSelector<State, T>(callback);
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
