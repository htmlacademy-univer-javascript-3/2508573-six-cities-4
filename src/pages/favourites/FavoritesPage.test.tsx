import { render, screen } from '@testing-library/react';
import { generateOffer } from '../../mocks/Offer';
import { withHistory, withStore } from '../../mocks/MockComponent';
import { makeFakeStore } from '../../mocks/Store';
import { FavoritesPage } from './FavoritesPage';

describe('Component: FavoritesPage', () => {
  const mockOffers = Array.from({ length: 10 }, generateOffer);
  const favoritesPageId = 'favorites-page';

  it('renders the favorites page with offers', () => {
    const mockStore = makeFakeStore();
    mockStore.offers.favorites = mockOffers;
    const { withStoreComponent } = withStore(
      <FavoritesPage />,
      mockStore
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(favoritesPageId)).toBeInTheDocument();
    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('renders the favorites page without offers', () => {
    const { withStoreComponent } = withStore(
      <FavoritesPage />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(favoritesPageId)).toBeInTheDocument();
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
