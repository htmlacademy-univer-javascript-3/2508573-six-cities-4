import { render, screen } from '@testing-library/react';
import {
  CardList,
  PlaceCardList,
  FavoritesCardList,
  NearbyCardList,
} from './CardList';
import { withStore, withHistory } from '../../mocks/MockComponent';
import { generateOffer } from '../../mocks/Offer';

describe('Component: CardList', () => {
  const mockOffers = [generateOffer(), generateOffer(), generateOffer()];

  const cardId = 'place-card';
  it('should render all offers in the list for CardList', () => {
    const { withStoreComponent } = withStore(
      <CardList
        offers={mockOffers}
        width={260}
        height={200}
        cardType="cities"
      />
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByTestId(cardId).length).toBe(
      mockOffers.length
    );

    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
      expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    });
  });

  it('should render all offers in the list for PlaceCardList', () => {
    const { withStoreComponent } = withStore(
      <PlaceCardList offers={mockOffers} />
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByTestId(cardId).length).toBe(
      mockOffers.length
    );

    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
      expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    });
  });

  it('should render all offers in the list for FavoritesCardList', () => {
    const { withStoreComponent } = withStore(
      <FavoritesCardList offers={mockOffers} />
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByTestId(cardId).length).toBe(
      mockOffers.length
    );

    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
      expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    });
  });

  it('should render all offers in the list for NearbyCardList', () => {
    const { withStoreComponent } = withStore(
      <NearbyCardList offers={mockOffers} />
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getAllByTestId(cardId).length).toBe(
      mockOffers.length
    );

    mockOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
      expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    });
  });
});
