import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';
import { withHistory, withStore } from '../../mocks/MockComponent';
import { makeFakeStore } from '../../mocks/Store';
import { generateOffer } from '../../mocks/Offer';

describe('Component: HomePage', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<HomePage />, makeFakeStore());
    const preparedcomponent = withHistory(withStoreComponent);
    render(preparedcomponent);

    const homePage = screen.getByTestId('homepage');

    expect(homePage).toBeInTheDocument();
  });

  it('should display spinner if isLoadingStatus is true', () => {
    const mockState = makeFakeStore();
    mockState.offers.offersLoadingStatus = true;
    const { withStoreComponent } = withStore(<HomePage />, mockState);
    const preparedcomponent = withHistory(withStoreComponent);
    render(preparedcomponent);

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeInTheDocument();
  });

  it('should render empty offer list if offers list is empty', () => {
    const { withStoreComponent } = withStore(<HomePage />, makeFakeStore());
    const preparedcomponent = withHistory(withStoreComponent);
    render(preparedcomponent);

    const emptyOfferList = screen.getByTestId('empty-offer-list');

    expect(emptyOfferList).toBeInTheDocument();
  });

  it('should render non-empty offer list if offers list is not empty', () => {
    const fakeOffers = [generateOffer(), generateOffer(), generateOffer()];
    const { withStoreComponent } = withStore(
      <HomePage />,
      makeFakeStore({
        offers: {
          favorites: [],
          offers: fakeOffers,
          offersLoadingStatus: false,
          sortingOrder: 'Popular',
        },
        city: { city: fakeOffers[0].city.name },
      })
    );
    const preparedcomponent = withHistory(withStoreComponent);

    render(preparedcomponent);

    expect(screen.getByTestId('cities__places-container')).toBeInTheDocument();
  });
});
