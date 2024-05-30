import { render, screen } from '@testing-library/react';
import { BookmarkButton } from './BookmarkButton';
import { AppRoutes } from '../../Constants';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../mocks/MockComponent';
import { extractActionsTypes } from '../../mocks/Utils';
import { changeFavoriteStatusAction } from '../../store/ApiActions';
import { createMemoryHistory } from 'history';

describe('Component: BookmarkButton', () => {
  const buttonId = 'bookmark-button';

  it('should render BookmarkButton with correct text when isFavorite is false', async () => {
    const { withStoreComponent } = withStore(
      <BookmarkButton offerId="123" isFavorite={false} type="place-card" />
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const button = screen.getByTestId(buttonId);
    await userEvent.hover(button);

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('should render BookmarkButton with correct text when isFavorite is true', () => {
    const { withStoreComponent } = withStore(
      <BookmarkButton offerId="123" isFavorite type="place-card" />
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });

  it('should call addToFavorites function when button is clicked', async () => {
    const offerId = '123';
    const isFavorite = false;
    const { withStoreComponent, mockStore } = withStore(
      <BookmarkButton
        offerId={offerId}
        isFavorite={isFavorite}
        type="place-card"
      />
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId(buttonId));
    const actions = mockStore.getActions();
    const actionsTypes = extractActionsTypes(actions);
    const changeFavoriteStatusPendingAction = actions.at(0) as ReturnType<
      typeof changeFavoriteStatusAction.pending
    >;

    expect(actionsTypes).toContainEqual(
      changeFavoriteStatusAction.pending.type
    );
    expect(changeFavoriteStatusPendingAction.meta.arg).toEqual({
      offerId: offerId,
      isFavorite: !isFavorite,
    });
  });

  it('should call navigate to login route if addToFavorites function catches an error', async () => {
    const offerId = '123';
    const isFavorite = false;
    const { withStoreComponent } = withStore(
      <BookmarkButton
        offerId={offerId}
        isFavorite={isFavorite}
        type="place-card"
      />
    );
    const history = createMemoryHistory();
    const preparedComponent = withHistory(withStoreComponent, history);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId(buttonId));

    expect(history.location.pathname).toEqual(AppRoutes.Login);
  });
});
