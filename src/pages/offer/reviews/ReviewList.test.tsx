import { render, screen } from '@testing-library/react';
import ReviewList from './ReviewList';
import { generateReview } from '../../../mocks/Review';

describe('Component: ReviewList', () => {
  const mockReviews = Array.from({ length: 11 }).map(() => generateReview());

  const reviewsTitleId = 'reviews_title';
  const reviewsItemsContainerId = 'reviews__items-container';
  const reviewsItemId = 'reviews__item';

  it('should render correct number of reviews and show title with total amount', () => {
    render(<ReviewList reviews={mockReviews} />);
    const reviewsTitle = screen.getByTestId(reviewsTitleId);
    const reviewsItemsContainer = screen.getByTestId(reviewsItemsContainerId);

    expect(reviewsTitle).toBeInTheDocument();
    expect(reviewsItemsContainer).toBeInTheDocument();
    expect(reviewsTitle).toHaveTextContent(mockReviews.length.toString());
  });

  it('should render up to 10 reviews sorted by date', () => {
    render(<ReviewList reviews={mockReviews} />);
    const reviewItems = screen.getAllByTestId(reviewsItemId);

    const sortedReviews = mockReviews
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    expect(reviewItems.length).toBeLessThanOrEqual(10);
    reviewItems.forEach((reviewItem, index) => {
      expect(reviewItem).toHaveTextContent(sortedReviews[index].comment);
    });
  });
});
