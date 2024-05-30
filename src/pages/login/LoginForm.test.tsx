import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';
import { withStore, withHistory } from '../../mocks/MockComponent';
import { extractActionsTypes } from '../../mocks/Utils';
import { loginAndFetchFavorites } from '../../store/ApiActions';
import { ApiRoutes } from '../../Constants';
import { generateUser } from '../../mocks/User';
import { makeFakeStore } from '../../mocks/Store';

describe('Component: LoginForm', () => {
  const loginTestId = 'login-form__login';
  const passwordTestId = 'login-form__password';
  const submitButtonId = 'login-form__submit-button';

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<LoginForm />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(loginTestId)).toBeInTheDocument();
    expect(screen.getByTestId(passwordTestId)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const expectedLoginValue = 'keks';
    const expectedPasswordValue = '123456';
    const { withStoreComponent } = withStore(<LoginForm />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginTestId),
      expectedLoginValue
    );
    await userEvent.type(
      screen.getByTestId(passwordTestId),
      expectedPasswordValue
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });

  it('should call login function on form submit', async () => {
    const testEmail = 'test@example.com';
    const testPassword = 'testpassword';
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<LoginForm />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    mockAxiosAdapter.onPost(ApiRoutes.Login).reply(200, generateUser());
    const expectedData = JSON.stringify({email: testEmail, password: testPassword });

    render(preparedComponent);

    await userEvent.type(
      screen.getByTestId(loginTestId),
      testEmail
    );
    await userEvent.type(
      screen.getByTestId(passwordTestId),
      testPassword
    );
    await userEvent.click(screen.getByTestId(submitButtonId));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toContain(loginAndFetchFavorites.pending.type);
    expect(actions).toContain(loginAndFetchFavorites.fulfilled.type);
    expect(mockAxiosAdapter.history.post.length).toEqual(1);
    expect(mockAxiosAdapter.history.post[0].data).toEqual(expectedData);
  });
});
