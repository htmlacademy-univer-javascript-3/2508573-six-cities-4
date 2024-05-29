import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createAPI } from '../services/api';
import { AppThunkDispatch } from './Utils';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { State } from '../entities/State';
import { createMemoryHistory, MemoryHistory } from 'history';
import { HistoryRouter } from './Router';

export function withHistory(
  component: JSX.Element,
  history: MemoryHistory = createMemoryHistory()
) {
  return (
    <HistoryRouter history={history}>
      <HelmetProvider>{component}</HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore<State>;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {}
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}
