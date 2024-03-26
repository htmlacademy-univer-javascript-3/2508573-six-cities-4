import { useState } from 'react';
import { Offer } from '../../entities/Offer';
import { PlaceCard } from './PlaceCard';
import { Nullable } from 'vitest';
import { CardTypes } from '../../Constants';

type CardListProps = {
  offers: Offer[];
  listType: CardTypes;
};

export default function CardList({ offers, listType }: CardListProps) {
  const [, setActiveCardId] = useState<Nullable<string>>();

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          {...offer}
          cardType={listType}
          onMouseOver={() => setActiveCardId(offer.id)}
          onMouseLeave={() => setActiveCardId(null)}
        />
      ))}
    </div>
  );
}
