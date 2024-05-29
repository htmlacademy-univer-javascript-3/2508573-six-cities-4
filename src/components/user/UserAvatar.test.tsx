import { render, screen } from '@testing-library/react';
import { UserData } from '../../entities/User';
import { UserAvatar, OfferUserAvatar, ReviewUserAvatar } from './UserAvatar';
import { generateUser } from '../../mocks/User';

describe('Component: UserAvatar', () => {
  const userContainerId = 'user-container';
  const userNameId = 'user__name';
  const userAvatarId = 'user__avatar';
  const userAvatarImageId = 'user__avatar-image';
  const userStatusId = 'user__status';

  let mockUser: UserData;

  beforeEach(() => {
    mockUser = generateUser();
  });

  it('should render user avatar with name and Pro status if applicable', () => {
    mockUser.isPro = true;

    render(<UserAvatar user={mockUser} type="offer" alt="User Avatar" size={74} />);
    const userContainer = screen.getByTestId(userContainerId);
    const userName = screen.getByTestId(userNameId);
    const userAvatar = screen.getByTestId(userAvatarId);
    const userAvatarImage = screen.getByTestId(userAvatarImageId);
    const userStatus = screen.getByTestId(userStatusId);

    expect(userContainer).toBeInTheDocument();
    expect(userName).toHaveTextContent(mockUser.name);
    expect(userAvatarImage).toHaveAttribute('src', mockUser.avatarUrl);
    expect(userStatus).toHaveTextContent('Pro');
    expect(userAvatar).toHaveClass('offer__avatar-wrapper--pro');
  });

  it('should render OfferUserAvatar component with specific size and type', () => {
    render(<OfferUserAvatar user={mockUser} alt="User Avatar" className="custom-class" />);
    const userContainer = screen.getByTestId(userContainerId);
    const userAvatar = screen.getByTestId(userAvatarId);

    expect(userContainer).toBeInTheDocument();
    expect(userAvatar).toHaveClass('offer__avatar-wrapper');
    expect(userAvatar).toHaveClass('user__avatar-wrapper');
  });

  it('should render ReviewUserAvatar component with specific size and type', () => {
    render(<ReviewUserAvatar user={mockUser} alt="User Avatar" />);
    const userContainer = screen.getByTestId(userContainerId);
    const userName = screen.getByTestId(userNameId);

    expect(userContainer).toBeInTheDocument();
    expect(userName).toHaveTextContent(mockUser.name);
  });
});
