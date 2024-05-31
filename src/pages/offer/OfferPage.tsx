import { Helmet } from 'react-helmet-async';
import { OfferBookmarkButton } from '../../components/cards/BookmarkButton';
import OfferGoods from './OfferGoods';
import { OfferUserAvatar } from '../../components/user/UserAvatar';
import ReviewList from './reviews/ReviewList';
import ReviewForm from './reviews/ReviewForm';
import Map from '../../components/map/Map';
import {
  AppRoutes,
  AuthorizationStatus,
  DEFAULT_MAP_ZOOM,
} from '../../Constants';
import styles from './OfferPage.module.css';
import { NearbyCardList } from '../../components/cards/CardList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useOfferPage } from './UseOfferPage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from '../../components/spinner/Spinner';
import { clearOffer } from '../../store/currentOffer/CurrentOfferSlice';
import pluralize from 'pluralize';
import { capitalizeFirstLetter } from '../../services/utils';

export function OfferPage() {
  const authStatus = useAppSelector((state) => state.auth.authorizationStatus);
  const { offer, reviews, nearbyOffers, isError, isLoading } = useOfferPage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isError) {
      navigate(AppRoutes.NotFound);
    }
  }, [isError, navigate]);

  useEffect(
    () => () => {
      dispatch(clearOffer());
    },
    [dispatch]
  );

  if (isLoading || offer === undefined) {
    return <Spinner />;
  }

  const offerLocation = { name: offer.id, location: offer.location };
  const displayedOffers = nearbyOffers
    .filter((o) => o.id !== offer.id)
    .slice(0, 3);
  const nearbyPoints = displayedOffers
    .map((o) => ({ name: o.id, location: o.location }))
    .concat(offerLocation);

  return (
    <>
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <main className="page__main page__main--offer" data-testid="offer-page">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images?.slice(0, 6).map((img) => (
                <div key={img} className="offer__image-wrapper">
                  <img className="offer__image" src={img} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark" data-testid="offer-premium">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name" data-testid="offer-title">{offer.title}</h1>
                <OfferBookmarkButton
                  offerId={offer.id}
                  isFavorite={offer.isFavorite}
                />
              </div>
              <div className="offer__rating rating" data-testid="offer-rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${(offer.rating * 100) / 5}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetter(offer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} {pluralize('Bedroom', offer.bedrooms)}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} {pluralize('adult', offer.maxAdults)}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value" data-testid="offer-price">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <OfferGoods items={offer.goods}/>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <OfferUserAvatar
                  user={offer.host}
                  alt="Host avatar"
                  className="offer__host-user"
                />
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews" data-testid="reviews-section">
                <ReviewList reviews={reviews}/>
                {authStatus === AuthorizationStatus.Auth && <ReviewForm />}
              </section>
            </div>
          </div>
          <div className={styles['offer__map-wrapper']}>
            <Map
              city={{
                ...offerLocation,
                location: { ...offerLocation.location, zoom: DEFAULT_MAP_ZOOM },
              }}
              points={nearbyPoints}
              selected={offerLocation}
              className="offer__map"
            />
          </div>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list" data-testid="nearby-offers">
              <NearbyCardList offers={displayedOffers} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
