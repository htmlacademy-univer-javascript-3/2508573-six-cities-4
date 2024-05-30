import { renderHook, waitFor } from '@testing-library/react';
import { useOfferPage } from './UseOfferPage';
import { withHistory, withStore } from '../../mocks/MockComponent';
import { makeFakeStore } from '../../mocks/Store';
import { State } from '../../entities/State';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoutes } from '../../Constants';
import { Route, Routes } from 'react-router';
import { MockStore } from '@jedmao/redux-mock-store';
import { extractActionsTypes } from '../../mocks/Utils';
import { fetchFullOffer } from '../../store/ApiActions';

describe('UseOfferPage', () => {
  let wrapper: React.JSXElementConstructor<{
    children: React.ReactElement;
  }>;
  let history: MemoryHistory;
  let initialState: State;
  let store: MockStore;

  beforeEach(() => {
    initialState = makeFakeStore();
    history = createMemoryHistory();
    wrapper = ({ children }) => {
      const { withStoreComponent, mockStore } = withStore(
        withHistory(
          <Routes>
            <Route path={AppRoutes.Offer} element={children}></Route>
          </Routes>,
          history
        ),
        initialState
      );
      store = mockStore;
      return withStoreComponent;
    };
  });

  it('should return the initial state', async () => {
    history.push('/offer/1');
    const { result } = renderHook(() => useOfferPage(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current).not.toBeUndefined();
    });

    expect(result.current).toEqual(initialState.currentOffer);
  });

  it('should dispatch fetchFullOffer action', async () => {
    history.push('/offer/1');
    const { result } = renderHook(() => useOfferPage(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current).not.toBeUndefined();
    });

    const actions = extractActionsTypes(store.getActions());
    expect(actions).toContainEqual(fetchFullOffer.pending.type);
  });
});
