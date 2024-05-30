import { getAllByTestId, render, screen } from '@testing-library/react';
import { OfferPage } from './OfferPage';
import { withHistory, withStore } from '../../mocks/MockComponent';
import { makeFakeStore } from '../../mocks/Store';
import { generateOffer } from '../../mocks/Offer';
import { Offer } from '../../entities/Offer';
import { State } from '../../entities/State';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../notfound/NotFoundPage';
import { AuthorizationStatus } from '../../Constants';

describe('Component: OfferPage', () => {
  const offerTitleId = 'offer-title';
  const offerPriceId = 'offer-price';
  const offerRatingId = 'offer-rating';
  const premiumLabelId = 'offer-premium';
  const reviewsTitleId = 'reviews_title';
  const reviewsItemsContainerId = 'reviews__items-container';
  const offerGoodsId = 'offer__inside-container';
  const nearbyOffersId = 'nearby-offers';
  const mapId = 'map';

  let initialState: State;
  let mockOffer: Offer;

  beforeEach(() => {
    mockOffer = generateOffer();
    initialState = makeFakeStore({
      currentOffer: {
        offer: mockOffer,
        nearbyOffers: [generateOffer(), generateOffer()],
        reviews: [],
        isError: false,
        isLoading: false,
      },
    });
    initialState.currentOffer.offer = mockOffer;
  });

  it('should render OfferPage with offer details', () => {
    const { withStoreComponent } = withStore(<OfferPage />, initialState);
    const preparedcomponent = withHistory(withStoreComponent);
    render(preparedcomponent);
    expect(screen.getByTestId(offerTitleId)).toHaveTextContent(mockOffer.title);
    expect(screen.getByTestId(offerPriceId)).toHaveTextContent(
      mockOffer.price.toString()
    );
    expect(screen.getByTestId(offerRatingId)).toHaveTextContent(
      mockOffer.rating.toString()
    );
    const goods = mockOffer.goods!;
    goods.forEach((good) => {
      expect(screen.getByTestId(offerGoodsId)).toHaveTextContent(good);
    });
    expect(screen.getByTestId(reviewsTitleId)).toBeInTheDocument();
    expect(screen.getByTestId(reviewsItemsContainerId)).toBeInTheDocument();
    expect(screen.getByTestId(mapId)).toBeInTheDocument();
  });

  it('should render only 3 nearby offers', () => {
    const { withStoreComponent } = withStore(<OfferPage />, initialState);
    const preparedcomponent = withHistory(withStoreComponent);
    render(preparedcomponent);

    const nearbyOffers = screen.getByTestId(nearbyOffersId);
    const placeCards = getAllByTestId(nearbyOffers, 'place-card');
    expect(placeCards.length).toBeLessThanOrEqual(3);
  });

  it('should redirect to NotFound page if error occurs', () => {
    initialState.currentOffer.isError = true;
    const { withStoreComponent } = withStore(<OfferPage />, initialState);
    const preparedComponent = withHistory(
      <Routes>
        <Route element={withStoreComponent} path="" />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
    render(preparedComponent);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  const reviewsFormId = 'reviews__form';
  it('should render ReviewForm if user is not authenticated', () => {
    const { withStoreComponent } = withStore(<OfferPage />, initialState);
    const preparedcomponent = withHistory(withStoreComponent);
    render(preparedcomponent);

    expect(screen.queryByTestId(reviewsFormId)).toBeNull();
  });

  it('should render ReviewForm if user is authenticated', () => {
    initialState.auth.authorizationStatus = AuthorizationStatus.Auth;
    const { withStoreComponent } = withStore(<OfferPage />, initialState);
    const preparedcomponent = withHistory(withStoreComponent);
    render(preparedcomponent);

    expect(screen.queryByTestId(reviewsFormId)).not.toBeNull();
  });

  it('should render premium label if offer is premium', () => {
    initialState.currentOffer.offer!.isPremium = true;
    const { withStoreComponent } = withStore(<OfferPage />, initialState);
    const preparedcomponent = withHistory(withStoreComponent);
    render(preparedcomponent);

    expect(screen.queryByTestId(premiumLabelId)).not.toBeNull();
  });

  it('should not render premium label if offer is not premium', () => {
    initialState.currentOffer.offer!.isPremium = false;
    const { withStoreComponent } = withStore(<OfferPage />, initialState);
    const preparedcomponent = withHistory(withStoreComponent);
    render(preparedcomponent);

    expect(screen.queryByTestId(premiumLabelId)).toBeNull();
  });
});
