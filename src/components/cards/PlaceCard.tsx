import { Link } from 'react-router-dom';
import { CardTypes } from '../../Constants';
import { Offer } from '../../entities/Offer';
import { CardBookmarkButton } from './BookmarkButton';
import cn from 'classnames';

type PlaceCardProps = Offer & {
  cardType: CardTypes;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
};

export function PlaceCard({
  id,
  isPremium,
  isFavorite,
  previewImage,
  price,
  rating,
  title,
  type,
  cardType,
  onMouseOver,
  onMouseLeave,
}: PlaceCardProps) {
  return (
    <article
      className={cn('place-card', {
        'cities__card': cardType === CardTypes.PlaceCard,
        'favorites__card': cardType === CardTypes.Favorites,
      })}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={cn('place-place-card__image-wrapper', {
          'cities__image-wrapper': cardType === CardTypes.PlaceCard,
          'favorites__image-wrapper': cardType === CardTypes.Favorites,
        })}
      >
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={cardType === CardTypes.PlaceCard ? 260 : 150}
            height={cardType === CardTypes.PlaceCard ? 200 : 110}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={cn('place-card__info', {'favorites__card-info': cardType === CardTypes.PlaceCard})}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <CardBookmarkButton isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(rating * 100) / 5}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
