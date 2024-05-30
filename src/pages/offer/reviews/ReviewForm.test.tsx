import { render, screen } from '@testing-library/react';
import ReviewForm from './ReviewForm';
import { withStore } from '../../../mocks/MockComponent';
import { generateOffer } from '../../../mocks/Offer';
import { ApiRoutes, AuthorizationStatus } from '../../../Constants';
import { makeFakeStore } from '../../../mocks/Store';
import userEvent from '@testing-library/user-event';
import { buildUrl } from '../../../services/apiUtils';
import { lorem } from 'faker';

describe('Component: ReviewForm', () => {
  const ratingInputId = 'reviews__rating-input';
  const textareaId = 'reviews__textarea';
  const formId = 'reviews__form';
  const submitButtonId = 'reviews__submit';

  it('should render ReviewForm with initial state', () => {
    const fakeStore = makeFakeStore();
    fakeStore.currentOffer.offer = generateOffer();
    fakeStore.auth.authorizationStatus = AuthorizationStatus.Auth;
    const { withStoreComponent } = withStore(<ReviewForm />, fakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(formId)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
    expect(screen.getByTestId(textareaId)).toBeInTheDocument();
    expect(screen.getAllByTestId(ratingInputId)).toHaveLength(5);
  });

  it('should update rating and comment fields in ReviewForm', async () => {
    const fakeStore = makeFakeStore();
    fakeStore.currentOffer.offer = generateOffer();
    fakeStore.auth.authorizationStatus = AuthorizationStatus.Auth;
    const { withStoreComponent } = withStore(<ReviewForm />, fakeStore);

    render(withStoreComponent);

    const ratingInputs = screen.getAllByTestId(ratingInputId);
    await userEvent.click(ratingInputs[4]);
    expect(ratingInputs[4]).toHaveProperty('checked', true);

    const textarea = screen.getByTestId(textareaId);
    await userEvent.type(textarea, 'Great stay!');
    expect(textarea).toHaveProperty('value', 'Great stay!');
  });

  it('should disable form while request is sending and enable it after completion', async () => {
    const fakeStore = makeFakeStore();
    const mockOffer = generateOffer();
    fakeStore.currentOffer.offer = mockOffer;
    fakeStore.auth.authorizationStatus = AuthorizationStatus.Auth;
    const { withStoreComponent, mockAxiosAdapter } = withStore(
      <ReviewForm />,
      fakeStore
    );

    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId(textareaId),
      lorem.sentence(50).slice(0, 50)
    );
    await userEvent.click(screen.getAllByTestId(ratingInputId)[0]);
    const submitButton = screen.getByTestId<HTMLButtonElement>(submitButtonId);
    let isDisabled = false;

    mockAxiosAdapter
      .onPost(buildUrl(ApiRoutes.Comments, { offerId: mockOffer.id }))
      .reply(() => {
        isDisabled = submitButton.disabled;
        return [200];
      });

    expect(submitButton).not.toBeDisabled();
    await userEvent.click(submitButton);
    expect(isDisabled).toEqual(true);
  });

  it('should not submit form if rating is not selected or review is not within 50-300 characters', async () => {
    const fakeStore = makeFakeStore();
    fakeStore.currentOffer.offer = generateOffer();
    fakeStore.auth.authorizationStatus = AuthorizationStatus.Auth;
    const { withStoreComponent } = withStore(<ReviewForm />, fakeStore);

    render(withStoreComponent);

    const submitButton = screen.getByTestId(submitButtonId);
    const ratingInputs = screen.getAllByTestId(ratingInputId);
    const textarea = screen.getByTestId<HTMLTextAreaElement>(textareaId);

    expect(submitButton).toBeDisabled();

    await userEvent.type(textarea, 'A great stay!');
    expect(submitButton).toBeDisabled();

    await userEvent.click(ratingInputs[4]);
    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'Short review');
    expect(submitButton).toBeDisabled();

    await userEvent.clear(textarea);
    await userEvent.type(textarea, '1'.repeat(50));
    expect(submitButton).not.toBeDisabled();

    await userEvent.clear(textarea);
    await userEvent.type(
      textarea,
      '1'.repeat(301)
    );
    expect(textarea.value.length).toBeLessThanOrEqual(300);
    expect(submitButton).not.toBeDisabled();
  }, 10000);
});
