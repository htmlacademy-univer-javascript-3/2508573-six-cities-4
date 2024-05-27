import { Helmet } from 'react-helmet-async';
import Tabs from '../../components/tabs/Tabs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import cn from 'classnames';
import { OfferList, EmptyOfferList } from './OfferList';
import { cityOffersSelector } from '../../store/Selectors';
import { changeCity } from '../../store/slices/CitySlice';
import { Spinner } from '../../components/spinner/Spinner';

export function HomePage() {
  const city = useAppSelector((state) => state.city.city);
  const offers = useAppSelector(cityOffersSelector);
  const isLoading = useAppSelector((state) => state.offers.offersLoadingStatus);

  const dispatch = useAppDispatch();

  const isEmpty = offers.length === 0;
  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <main
        className={cn('page__main', 'page__main--index', {
          'page__main--index-empty': isEmpty,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <Tabs
          selectedCity={city}
          onClick={(c) => dispatch(changeCity(c))}
        />
        <div className="cities">
          {isLoading ? (
            <Spinner />
          ) : (
            <div
              className={cn('cities__places-container', 'container', {
                'cities__places-container--empty': isEmpty,
              })}
            >
              {!isEmpty ? (
                <OfferList offers={offers} city={offers[0].city} />
              ) : (
                <EmptyOfferList city={city} />
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
