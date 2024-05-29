import { Review } from '../../../entities/Review';
import ReviewItem from './ReviewItem';

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <>
      <h2 className="reviews__title" data-testid="reviews_title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list" data-testid="reviews__items-container">
        {reviews
          .toSorted(
            (x, y) => new Date(y.date).getTime() - new Date(x.date).getTime()
          )
          .slice(0, 10)
          .map((review) => (
            <li key={review.id} className="reviews__item" data-testid="reviews__item">
              <ReviewItem {...review} />
            </li>
          ))}
      </ul>
    </>
  );
}
