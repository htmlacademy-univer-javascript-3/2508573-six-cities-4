import { render, screen } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import { withHistory, withStore } from '../../mocks/MockComponent';
import { AuthorizationStatus, AppRoutes } from '../../Constants';
import { makeFakeStore } from '../../mocks/Store';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

describe('Component: LoginPage', () => {
  it('should redirect to Main page if user is already authenticated', () => {
    const { withStoreComponent, mockStore } = withStore(
      <LoginPage />,
      makeFakeStore({
        auth: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: null,
        },
      })
    );
    const history = createMemoryHistory();
    const preparedComponent = withHistory(withStoreComponent, history);

    render(preparedComponent);

    expect(mockStore.getActions()).toHaveLength(0);
    expect(history.location.pathname).toBe(AppRoutes.Main);
  });

  it('should render LoginForm component when user is not authenticated', () => {
    const { withStoreComponent } = withStore(
      <LoginPage />,
      makeFakeStore({
        auth: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          user: null,
        },
      })
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    screen
      .getAllByText('Sign in')
      .forEach((e) => expect(e).toBeInTheDocument());
    expect(screen.getByTestId('login-form__login')).toBeInTheDocument();
    expect(screen.getByTestId('login-form__password')).toBeInTheDocument();
  });

  it('should dispatch changeCity action with correct city on city button click', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <LoginPage />,
      makeFakeStore()
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const cityButton = screen.getByTestId('locations__city-link');
    const city = cityButton.textContent;
    await userEvent.click(cityButton);

    const actions = mockStore.getActions();
    const changeCityAction = actions.find(
      (action) => action.type === 'city/changeCity'
    );

    expect(changeCityAction).toBeDefined();
    expect(changeCityAction?.payload).toEqual(city);
  });
});
