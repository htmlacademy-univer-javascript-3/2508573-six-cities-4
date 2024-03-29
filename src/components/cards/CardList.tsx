import { useState } from 'react';
import { Offer } from '../../entities/Offer';
import { PlaceCard } from './PlaceCard';
import { Nullable } from 'vitest';

type CardListProps = {
  offers: Offer[];
  width: number;
  height: number;
  cardType: string;
  infoClassName?: string;
};

export function CardList({ offers, ...props }: CardListProps) {
  const [, setActiveCardId] = useState<Nullable<string>>();

  return offers.map((offer) => (
    <PlaceCard
      key={offer.id}
      offer={offer}
      {...props}
      onMouseOver={() => setActiveCardId(offer.id)}
      onMouseLeave={() => setActiveCardId(null)}
    />
  ));
}

export const PlaceCardList = ({ offers }: { offers: Offer[] }) => (
  <CardList offers={offers} width={260} height={200} cardType="cities" />
);

export const FavoritesCardList = ({ offers }: { offers: Offer[] }) => (
  <CardList
    offers={offers}
    width={150}
    height={110}
    cardType="favorites"
    infoClassName="favorites__card-info"
  />
);
