import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import { withHistory } from '../../mocks/MockComponent';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    render(withHistory(<NotFoundPage />));

    const notFoundPage = screen.getByTestId('notfoundpage');
    const goToHomePageButton = screen.getByTestId('notfoundpage__goto-home');

    expect(notFoundPage).toBeInTheDocument();
    expect(notFoundPage.textContent).toContain('Page not found');
    expect(goToHomePageButton.textContent).toContain('Go to home page');
  });
});
