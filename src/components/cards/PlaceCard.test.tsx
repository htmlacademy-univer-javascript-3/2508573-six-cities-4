import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlaceCard } from './PlaceCard';
import { generateOffer } from '../../mocks/Offer';
import { withHistory, withStore } from '../../mocks/MockComponent';

describe('Component: PlaceCard', () => {
  const mockOffer = generateOffer();
  const cardId = 'place-card';

  it('should render PlaceCard with correct information', () => {
    const { withStoreComponent } = withStore(<PlaceCard offer={mockOffer} cardType="cities" width={260} height={200} />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toBeInTheDocument();
  });

  it('should call onHover callback when mouse enters and leaves', async () => {
    const mockHoverCallback = vi.fn();
    const { withStoreComponent } = withStore(<PlaceCard offer={mockOffer} cardType="cities" width={260} height={200} onHover={mockHoverCallback} />);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const article = screen.getByTestId(cardId);
    await userEvent.hover(article);
    expect(mockHoverCallback).toHaveBeenCalledTimes(1);
    expect(mockHoverCallback).toHaveBeenCalledWith(mockOffer.id);

    await userEvent.unhover(article);
    expect(mockHoverCallback).toHaveBeenCalledTimes(2);
    expect(mockHoverCallback).toHaveBeenCalledWith(null);
  });

  it('should render Premium mark when offer isPremium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };
    const { withStoreComponent } = withStore(<PlaceCard offer={premiumOffer} cardType="cities" width={260} height={200} />);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});
