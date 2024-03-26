import { PlaceCard } from '../../components/cards/PlaceCard';
import LocationHeader from '../../components/locations/LocationHeader';
import { CardTypes } from '../../Constants';
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
            {offers
              .filter((x) => x.city.name === city)
              .map((offer) => (
                <PlaceCard
                  key={offer.id}
                  {...offer}
                  cardType={CardTypes.Favorites}
                />
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
