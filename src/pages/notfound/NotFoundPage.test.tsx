import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import { withHistory } from '../../mocks/MockComponent';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    render(withHistory(<NotFoundPage />));

    const notFoundText = screen.getByText('Page not found');
    const goToHomePageButton = screen.getByRole('link', {
      name: 'Go to home page',
    });

    expect(notFoundText).toBeInTheDocument();
    expect(goToHomePageButton).toBeInTheDocument();
  });
});
