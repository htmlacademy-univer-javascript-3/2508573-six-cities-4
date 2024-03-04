import { BookmarkButton } from './BookmarkButton';

type PlaceCardProps = {
    isPremium: boolean;
    imageLink: string;
    price: number;
    rating: number;
    title: string;
    type: string;
}


export function PlaceCard({ isPremium, imageLink, price, rating, title: name, type }: PlaceCardProps) {
  return (
    <article className="cities__card place-card">
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={imageLink}
            width={260}
            height={200}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton isFavourite={false} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 100 / 5}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">
            {name}
          </a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>);
}
