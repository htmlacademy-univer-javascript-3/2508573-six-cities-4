import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('Component: ErrorMessage', () => {
  const mockMessage = 'An error occurred!';

  it('should render error message and call onClose when close button is clicked', () => {
    const onCloseMock = vitest.fn();
    render(<ErrorMessage message={mockMessage} onClose={onCloseMock} />);

    const errorMessage = screen.getByTestId('error-message');
    const errorMessageText = screen.getByTestId('error-message-text');
    const closeButton = screen.getByTestId('error-message__close-button');

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessageText).toHaveTextContent(mockMessage);

    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
