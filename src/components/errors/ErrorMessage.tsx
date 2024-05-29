import { AnimationEvent } from 'react';
import styles from './ErrorMessage.module.css';

type ErrorMessageProps = {
  message: string;
  onClose: () => void;
};

export function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === styles['fadeOut']) {
      onClose();
    }
  };

  return (
    <div className={styles['error-message']} data-testid="error-message" onAnimationEnd={handleAnimationEnd}>
      <p data-testid="error-message-text">{message}</p>
      <button onClick={onClose} data-testid="error-message__close-button">Close</button>
    </div>
  );
}
