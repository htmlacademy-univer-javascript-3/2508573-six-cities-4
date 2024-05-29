import { render, screen } from '@testing-library/react';
import { random } from 'faker';
import OfferGoods from './OfferGoods';

describe('Component: OfferGoods', () => {
  it('should render correct', () => {
    const items = random.words(5).split(' ');
    const goodsContainerTestId = 'offer__inside-container';
    const goodsValueTestId = 'offer__inside-value';

    render(<OfferGoods items={items} />);
    const goodsContainer = screen.getByTestId(goodsContainerTestId);
    const goodsValues = screen.getAllByTestId(goodsValueTestId).map((x) => x.textContent);

    expect(goodsContainer).toBeInTheDocument();
    expect(goodsValues.length).toEqual(items.length);
    expect(goodsValues).toEqual(items);
  });
});
