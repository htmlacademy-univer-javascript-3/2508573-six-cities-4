import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Layout from './Layout';
import { withStore, withHistory } from '../../mocks/MockComponent';
import { extractActionsTypes } from '../../mocks/Utils';
import { logoutAction } from '../../store/ApiActions';
import { makeFakeStore } from '../../mocks/Store';
import { AuthorizationStatus } from '../../Constants';
import { generateUser } from '../../mocks/User';
import { generateOffer } from '../../mocks/Offer';

describe('Component: Layout', () => {
  const logoutButtonId = 'layout__logout-button';
  const loginButtonId = 'layout__login-button';
  const favoriteCountId = 'layout__favorite-count';
  const userEmailId = 'layout__user-email';

  it('should render correctly if user authenticated', () => {
    const initialState = makeFakeStore();
    const mockUser = generateUser();
    initialState.auth.authorizationStatus = AuthorizationStatus.Auth;
    initialState.auth.user = mockUser;
    const { withStoreComponent } = withStore(<Layout />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const userEmail = screen.getByTestId(userEmailId);
    expect(userEmail).toBeInTheDocument();
    expect(userEmail.textContent).toEqual(mockUser.email);
    expect(screen.getByTestId(favoriteCountId)).toBeInTheDocument();
    expect(screen.getByTestId(logoutButtonId)).toBeInTheDocument();
    expect(screen.queryByTestId(loginButtonId)).toBeNull();
  });

  it('should render correctly if user not authenticated', () => {
    const initialState = makeFakeStore();
    initialState.auth.authorizationStatus = AuthorizationStatus.NoAuth;
    const { withStoreComponent } = withStore(<Layout />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(loginButtonId)).toBeInTheDocument();
    expect(screen.queryByTestId(logoutButtonId)).toBeNull();
  });

  it('should call logout function on logout button click', async () => {
    const initialState = makeFakeStore();
    initialState.auth.authorizationStatus = AuthorizationStatus.Auth;
    initialState.auth.user = generateUser();
    const { withStoreComponent, mockStore } = withStore(
      <Layout />,
      initialState
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId(logoutButtonId));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toContain(logoutAction.pending.type);
  });

  it('should display correct favorite count', () => {
    const initialState = makeFakeStore();
    const mockFavorites = Array.from({ length: 3 }, generateOffer);
    initialState.offers.favorites = mockFavorites;
    initialState.auth.authorizationStatus = AuthorizationStatus.Auth;
    initialState.auth.user = generateUser();
    const { withStoreComponent } = withStore(<Layout />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(favoriteCountId).textContent).toEqual(mockFavorites.length.toString());
  });
});
