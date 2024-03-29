import { FavoritesCardList } from '../../components/cards/CardList';
import LocationHeader from '../../components/locations/LocationHeader';
import { Offer } from '../../entities/Offer';

type FavoritesListProps = {
  offers: Offer[];
};

export default function FavoritesList({ offers }: FavoritesListProps) {
  const cities = Array.from(new Set(offers.map((x) => x.city.name).toSorted()));

  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <LocationHeader title={city} selected />
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
