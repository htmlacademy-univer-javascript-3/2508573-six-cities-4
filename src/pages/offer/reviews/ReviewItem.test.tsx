import { render, screen } from '@testing-library/react';
import { Review } from '../../../entities/Review';
import ReviewItem from './ReviewItem';
import { generateUser } from '../../../mocks/User';

describe('Component: ReviewItem', () => {
  const mockReview: Review = {
    date: '2022-01-15',
    user: generateUser(),
    comment: 'Great experience!',
    rating: 4,
    id: '1'
  };

  const reviewsTextId = 'reviews__text';
  const reviewsTimeId = 'reviews__time';
  const reviewsInfoContainerId = 'reviews__info-container';

  it('should render correct review information', () => {
    const expectedDateText = 'January 2022';
    const expectedDateTime = '2022-01-15';

    render(<ReviewItem {...mockReview} />);
    const reviewsInfoContainer = screen.getByTestId(reviewsInfoContainerId);
    const reviewText = screen.getByTestId(reviewsTextId);
    const reviewTime = screen.getByTestId(reviewsTimeId);

    expect(reviewsInfoContainer).toBeInTheDocument();
    expect(reviewText).toHaveTextContent(mockReview.comment);
    expect(reviewTime).toHaveTextContent(expectedDateText);
    expect(reviewTime).toHaveAttribute('datetime', expectedDateTime);
  });
});
