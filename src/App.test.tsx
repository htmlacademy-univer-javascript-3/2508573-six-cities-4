import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { App } from './App';
import { ApiRoutes, AppRoutes, AuthorizationStatus } from './Constants';
import { withHistory, withStore } from './mocks/MockComponent';
import { makeFakeStore } from './mocks/Store';
import { generateOffer } from './mocks/Offer';
import { buildUrl } from './services/apiUtils';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main" component when user navigates to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoutes.Main);

    render(withStoreComponent);

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  it('should render "Login" component when user navigates to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoutes.Login);

    render(withStoreComponent);

    screen
      .getAllByText('Sign in')
      .forEach((e) => expect(e).toBeInTheDocument());
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('should render "Offer" component when user navigates to "/offer/:offerId"', () => {
    const mockOffer = generateOffer();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent, mockAxiosAdapter } = withStore(
      withHistoryComponent,
      makeFakeStore({
        currentOffer: {
          offer: mockOffer,
          reviews: [],
          isError: false,
          isLoading: false,
          nearbyOffers: [],
        },
      })
    );
    mockAxiosAdapter
      .onGet(buildUrl(ApiRoutes.Offer, { offerId: mockOffer.id }))
      .reply(200, mockOffer);

    mockHistory.push(`/offer/${mockOffer.id}`);
    render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.description)).toBeInTheDocument();
  });

  it('should render "Favorites" component when user navigates to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({ auth: { authorizationStatus: AuthorizationStatus.Auth, user: null }})
    );
    mockHistory.push(AppRoutes.Favorites);

    render(withStoreComponent);

    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
  });

  it('should render "NotFound" component when user navigates to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
