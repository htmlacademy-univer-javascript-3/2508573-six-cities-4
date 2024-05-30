import { useMemo } from 'react';
import { FavoritesCardList } from '../../components/cards/CardList';
import LocationHeader from '../../components/locations/LocationHeader';
import { Offer } from '../../entities/Offer';

type FavoritesListProps = {
  offers: Offer[];
};

export default function FavoritesList({ offers }: FavoritesListProps) {
  const cities = useMemo(
    () => Array.from(new Set(offers.map((x) => x.city.name).sort())),
    [offers]
  );

  return (
    <ul className="favorites__list" data-testid="favorites-list">
      {cities.map((city) => (
        <li className="favorites__locations-items" key={city} data-testid="favorites-list__item">
          <LocationHeader title={city} selected/>
          <div className="favorites__places">
            <FavoritesCardList
              offers={offers.filter((x) => x.city.name === city)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
