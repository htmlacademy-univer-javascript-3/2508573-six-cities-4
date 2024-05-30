import { render, screen } from '@testing-library/react';
import { OfferList, EmptyOfferList } from './OfferList';
import { generateLocation } from '../../mocks/Location';
import { generateOffer } from '../../mocks/Offer';
import { withHistory, withStore } from '../../mocks/MockComponent';
import { makeFakeStore } from '../../mocks/Store';

describe('Component: OfferList', () => {
  const mockOffers = [generateOffer(), generateOffer()];
  const mockCity = generateLocation();
  const offerListId = 'cities__places-container';
  const placesFoundId = 'places__found';
  const placesListId = 'cities__places-list';
  const mapId = 'map';

  it('renders the list of offers', () => {
    const { withStoreComponent } = withStore(<OfferList offers={mockOffers} city={mockCity} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const placesFound = screen.getByTestId(placesFoundId);
    expect(screen.getByTestId(offerListId)).toBeInTheDocument();
    expect(placesFound).toBeInTheDocument();
    expect(screen.getByTestId(placesListId)).toBeInTheDocument();
    expect(screen.getByTestId(mapId)).toBeInTheDocument();
  });

  it('displays the correct number of places found and correct city', () => {
    const { withStoreComponent } = withStore(<OfferList offers={mockOffers} city={mockCity} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const placesFound = screen.getByTestId(placesFoundId);
    expect(placesFound).toHaveTextContent(mockOffers.length.toString());
    expect(placesFound).toHaveTextContent(mockCity.name);
  });

  it('displays the correct city name', () => {
    const { withStoreComponent } = withStore(<OfferList offers={mockOffers} city={mockCity} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const placesFound = screen.getByTestId(placesFoundId);
    expect(placesFound).toHaveTextContent(mockCity.name);
  });

  it('renders each offer in the list', () => {
    const { withStoreComponent } = withStore(<OfferList offers={mockOffers} city={mockCity} />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    mockOffers.forEach((o) => {
      expect(screen.getByText(o.title)).toBeInTheDocument();
    });
  });

  it('renders an empty offer list', () => {
    render(<EmptyOfferList city={mockCity.name} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
