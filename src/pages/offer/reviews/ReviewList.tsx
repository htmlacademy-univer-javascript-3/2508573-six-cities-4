import { Review } from '../../../entities/Review';
import ReviewItem from './ReviewItem';

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews
          .toSorted(
            (x, y) => new Date(y.date).getTime() - new Date(x.date).getTime()
          )
          .slice(0, 10)
          .map((review) => (
            <li key={review.id} className="reviews__item">
              <ReviewItem {...review} />
            </li>
          ))}
      </ul>
    </>
  );
}
