import { PlaceCardList } from '../../components/cards/CardList';
import { useState } from 'react';
import { Nullable } from 'vitest';
import Map from '../../components/map/Map';
import { Offer } from '../../entities/Offer';
import { Location } from '../../entities/Location';

type OfferListProps = {
  offers: Offer[];
  city: Location;
};

export function OfferList({ offers, city }: OfferListProps) {
  const [selectedId, setSelectedId] = useState<Nullable<string>>();
  const points = offers.map((o) => ({ name: o.id, point: o.location }));

  return (
    <>
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
            <li className="places__option places__option--active" tabIndex={0}>
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
        {city && (
          <Map
            city={city}
            points={points}
            selected={points.find((p) => p.name === selectedId)}
            className="cities__map"
          />
        )}
      </div>
    </>
  );
}

export function EmptyOfferList({ city }: { city: string }) {
  return (
    <>
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">
            We could not find any property available at the moment in {city}
          </p>
        </div>
      </section>
      <div className="cities__right-section" />
    </>
  );
}
