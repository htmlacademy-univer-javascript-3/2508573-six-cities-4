import { State } from '../../entities/State';
import { generateOffer } from '../../mocks/Offer';
import { cityOffersSelector } from './Selectors';

describe('cityOffersSelector', () => {
  const offers = [
    generateOffer(),
    generateOffer(),
    generateOffer()
  ];
  offers[1].city = offers[0].city;
  offers[2].city.name = '123';
  offers[0].price = 1;
  offers[1].price = 2;
  offers[2].price = 3;

  const mockState: Pick<State, 'offers' | 'city'> = {
    offers: {
      offers: offers,
      sortingOrder: 'Price: low to high',
      offersLoadingStatus: false,
      favorites: []
    },
    city: {
      city: offers[0].city.name,
    },
  };

  it('should filter and sort offers by city name and sorting order', () => {
    const selectedOffers = cityOffersSelector(mockState);

    expect(selectedOffers).toHaveLength(2);
    expect(selectedOffers[0].id).toBe(offers[0].id);
    expect(selectedOffers[1].id).toBe(offers[1].id);
  });

  it('should return an empty array if city name does not match any offers', () => {
    const newState = { ...mockState, city: { city: 'London' } };

    const selectedOffers = cityOffersSelector(newState);

    expect(selectedOffers).toHaveLength(0);
  });
});
