import { Offer } from '../../entities/Offer';
import { MemoPlaceCard } from './PlaceCard';
import { Nullable } from 'vitest';

type GenericCardListProps = {
  offers: Offer[];
  width: number;
  height: number;
  cardType: string;
  infoClassName?: string;
  onItemHover?: (id: Nullable<string>) => void;
};

export function CardList({
  offers,
  onItemHover,
  ...props
}: GenericCardListProps) {
  return offers.map((offer) => (
    <MemoPlaceCard
      key={offer.id}
      offer={offer}
      {...props}
      onHover={onItemHover}
    />
  ));
}

type CardListProps = Omit<
  GenericCardListProps,
  'width' | 'height' | 'cardType'
>;

export const PlaceCardList = (props: CardListProps) => (
  <CardList {...props} width={260} height={200} cardType="cities" />
);

export const FavoritesCardList = (props: CardListProps) => (
  <CardList
    {...props}
    width={150}
    height={110}
    cardType="favorites"
    infoClassName="favorites__card-info"
  />
);

export const NearbyCardList = (props: CardListProps) => (
  <CardList {...props} width={260} height={200} cardType="near-places" />
);
