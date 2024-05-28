import { errorSlice, addErrorMessage, removeErrorMessage } from './ErrorsSlice';
import { ErrorsState } from './ErrorsSlice';

describe('Error slice', () => {
  let initialState: ErrorsState;

  beforeEach(() => {
    initialState = { messages: [] };
  });

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = errorSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should add error message with \'addErrorMessage\' action', () => {
    const errorMessage = 'An error occurred';

    const result = errorSlice.reducer(initialState, addErrorMessage(errorMessage));

    expect(result.messages).toHaveLength(1);
    expect(result.messages[0]).toEqual(errorMessage);
  });

  it('should remove error message with \'removeErrorMessage\' action', () => {
    initialState.messages = ['Error 1', 'Error 2', 'Error 3'];
    const expectedState = ['Error 1', 'Error 3'];

    const result = errorSlice.reducer(initialState, removeErrorMessage(1));

    expect(result.messages).not.toContain('Error 2');
    expect(result.messages).toHaveLength(2);
    expect(result.messages).toEqual(expectedState);
  });
});
