import moment from 'moment';
import { Review } from '../../../entities/Review';
import { ReviewUserAvatar } from '../../../components/user/UserAvatar';


export default function ReviewItem({date, user, comment, rating}: Review) {
  const dateToFormat = moment.utc(date);
  return (
    <>
      <ReviewUserAvatar user={user} alt="Reviews avatar" className="reviews__user"/>
      <div className="reviews__info" data-testid="reviews__info-container">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(rating * 100) / 5}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text" data-testid="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={dateToFormat.format('YYYY-MM-DD')} data-testid="reviews__time">
          {dateToFormat.format('MMMM YYYY')}
        </time>
      </div>
    </>
  );
}
