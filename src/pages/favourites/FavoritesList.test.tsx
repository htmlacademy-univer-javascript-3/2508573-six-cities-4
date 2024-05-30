import {
  getAllByTestId,
  getByTestId,
  render,
  screen,
} from '@testing-library/react';
import FavoritesList from './FavoritesList';
import { generateOffer } from '../../mocks/Offer';
import { withHistory, withStore } from '../../mocks/MockComponent';
import { makeFakeStore } from '../../mocks/Store';

describe('Component: FavoritesList', () => {
  const mockOffers = Array.from({ length: 10 }, generateOffer);
  const favoritesListId = 'favorites-list';
  const favoritesListItemId = 'favorites-list__item';
  const favoretesListHeaderId = 'locations__item-link';

  it('renders the list of favorite offers', () => {
    const { withStoreComponent } = withStore(
      <FavoritesList offers={mockOffers} />,
      makeFakeStore()
    );
    const preparedcomponent = withHistory(withStoreComponent);

    const { getByText } = render(preparedcomponent);

    expect(screen.getByTestId(favoritesListId)).toBeInTheDocument();
    mockOffers.forEach((offer) => {
      expect(getByText(offer.title)).toBeInTheDocument();
      expect(getByText(offer.city.name)).toBeInTheDocument();
    });
  });

  it('renders the list of favorite offers grouped by city', () => {
    const { withStoreComponent } = withStore(
      <FavoritesList offers={mockOffers} />,
      makeFakeStore()
    );
    const preparedcomponent = withHistory(withStoreComponent);

    render(preparedcomponent);

    const favoritesListItems = screen.getAllByTestId(favoritesListItemId);
    favoritesListItems.forEach((item) => {
      const city = getByTestId(item, favoretesListHeaderId).textContent;
      const placeCards = getAllByTestId(item, 'place-card__name');
      const matchingOffers = placeCards
        .map((placeCard) =>
          mockOffers.find((offer) => offer.title === placeCard.textContent)
        )
        .filter((offer) => offer !== undefined);

      matchingOffers.forEach((offer) => {
        expect(offer.city.name).toEqual(city);
      });
    });
  });
});
