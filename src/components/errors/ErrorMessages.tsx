import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeErrorMessage } from '../../store/errors/ErrorsSlice';
import { ErrorMessage } from './ErrorMessage';
import styles from './ErrorMessage.module.css';

export default function ErrorMessages() {
  const dispatch = useAppDispatch();
  const errorMessages = useAppSelector((state) => state.error.messages);

  const handleCloseMessage = (index: number) => {
    dispatch(removeErrorMessage(index));
  };
  return (
    <div className={styles['error-message-container']}>
      {errorMessages.map((message, index) => (
        <ErrorMessage
          key={message + index.toString()}
          message={message}
          onClose={() => handleCloseMessage(index)}
        />
      ))}
    </div>
  );
}
