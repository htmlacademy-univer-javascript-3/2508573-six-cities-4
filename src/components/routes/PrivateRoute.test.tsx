import { MemoryHistory, createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AppRoutes, AuthorizationStatus } from '../../Constants';
import { withHistory, withStore } from '../../mocks/MockComponent';
import PrivateRoute from './PrivateRoute';
import { makeFakeStore } from '../../mocks/Store';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoutes.Main);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoutes.Login} element={<span>{expectedText}</span>} />
        <Route element={<PrivateRoute />}>
          <Route
            path={AppRoutes.Main}
            element={<span>{notExpectedText}</span>}
          />
        </Route>
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoutes.Login} element={<span>{notExpectedText}</span>} />
        <Route element={<PrivateRoute />}>
          <Route
            path={AppRoutes.Main}
            element={<span>{expectedText}</span>}
          />
        </Route>
      </Routes>,
      mockHistory
    );
    const fakeStore = makeFakeStore();
    fakeStore.auth.authorizationStatus = AuthorizationStatus.Auth;
    const { withStoreComponent } = withStore(componentWithHistory, fakeStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
