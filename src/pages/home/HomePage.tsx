import { Helmet } from 'react-helmet-async';
import { PlaceCardList } from '../../components/cards/CardList';
import { useEffect, useState } from 'react';
import { Nullable } from 'vitest';
import Map from '../../components/map/Map';
import Tabs from '../../components/tabs/Tabs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fillOrdersAction } from '../../store/Actions';

export function HomePage() {
  const [selectedId, setSelectedId] = useState<Nullable<string>>();

  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) =>
    state.offers.filter((o) => o.city.name === city.name)
  );

  const points = offers.map((o) => ({ name: o.id, point: o.location }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fillOrdersAction());
  });

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs selectedCity={city.name} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in {city.name}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <PlaceCardList offers={offers} onItemHover={setSelectedId} />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                city={city}
                points={points}
                selected={points.find((p) => p.name === selectedId)}
                className="cities__map"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
