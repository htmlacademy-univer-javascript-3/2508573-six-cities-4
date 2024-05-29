import { memo, useState } from 'react';
import cn from 'classnames';
import { SortingOrder, sortingOrders } from '../../entities/SortingOrder';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeSortingOrder } from '../../store/offers/OffersSlice';
import '../../../markup/css/main.css';

function SortingOrderListInternal() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOrder = useAppSelector((state) => state.offers.sortingOrder);
  const dispatch = useAppDispatch();

  const open = () => setIsOpen(!isOpen);

  const changeOrder = (order: SortingOrder) => {
    dispatch(changeSortingOrder(order));
    open();
  };

  return (
    <form className="places__sorting" action="#" method="get" data-testid="places__sorting">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" data-testid="places__sotring-type" tabIndex={0} onClick={open}>
        {selectedOrder}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={cn('places__options', 'places__options--custom', {
          'places__options--opened': isOpen,
        })}
        data-testid="places__options"
      >
        {Object.keys(sortingOrders).map((order) => (
          <li
            key={order}
            className={cn('places__option', {
              'places__option--active': order === selectedOrder,
            })}
            tabIndex={0}
            onClick={() => changeOrder(order as SortingOrder)}
            data-testid="places__option"
          >
            {order}
          </li>
        ))}
      </ul>
    </form>
  );
}

export const SortingOrderList = memo(SortingOrderListInternal);
