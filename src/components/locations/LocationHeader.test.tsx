import { render, screen } from '@testing-library/react';
import LocationHeader from './LocationHeader';
import { withHistory } from '../../mocks/MockComponent';

describe('Component: LocationHeader', () => {
  const mockTitle = 'New York';
  const selected = true;

  it('should render locations container and title', () => {
    const preparedComponent = withHistory(<LocationHeader title={mockTitle} selected={selected} />);
    render(preparedComponent);

    const locationsContainer = screen.getByTestId('locations-container');
    const titleElement = screen.getByTestId('locations__item-link');

    expect(locationsContainer).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(mockTitle);
  });
});
