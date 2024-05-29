import { render, screen } from '@testing-library/react';
import { SortingOrderList } from './SortingOrderList';
import { changeSortingOrder } from '../../store/offers/OffersSlice';
import { sortingOrders } from '../../entities/SortingOrder';
import { withStore } from '../../mocks/MockComponent';
import { makeFakeStore } from '../../mocks/Store';
import userEvent from '@testing-library/user-event';

describe('Component: SortingOrderList', () => {
  const sortingId = 'places__sorting';
  const sortingTypeId = 'places__sotring-type';
  const optionsId = 'places__options';
  const optionId = 'places__option';

  it('should render SortingOrderList with default state', () => {
    const { withStoreComponent } = withStore(
      <SortingOrderList />,
      makeFakeStore()
    );
    render(withStoreComponent);

    expect(screen.getByTestId(sortingId)).toBeInTheDocument();
    expect(screen.getByTestId(optionsId)).toBeInTheDocument();
    expect(screen.getAllByTestId(optionId).map((e) => e.textContent)).toEqual(
      Object.keys(sortingOrders)
    );
  });

  it('should open and close sorting options on click', async () => {
    const { withStoreComponent } = withStore(
      <SortingOrderList />,
      makeFakeStore()
    );
    render(withStoreComponent);

    expect(screen.getByTestId(sortingId)).toBeInTheDocument();

    const sortingType = screen.getByTestId(sortingTypeId);
    const options = screen.getByTestId(optionsId);

    expect(options).not.toBeVisible();

    await userEvent.click(sortingType);
    expect(options).toBeVisible();

    await userEvent.click(sortingType);
    expect(options).not.toBeVisible();
  });

  it('should change sorting order on option click', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <SortingOrderList />,
      makeFakeStore()
    );
    render(withStoreComponent);

    const clickOption = screen.getAllByTestId(optionId)[1];
    await userEvent.click(clickOption);

    const actions = mockStore.getActions();
    const changeSortingOrderDispatched = actions.find(
      (a) => a.type === changeSortingOrder.type
    ) as ReturnType<typeof changeSortingOrder>;
    expect(changeSortingOrderDispatched).toBeDefined();
    expect(changeSortingOrderDispatched.payload).toEqual(
      clickOption.textContent
    );
  });
});
