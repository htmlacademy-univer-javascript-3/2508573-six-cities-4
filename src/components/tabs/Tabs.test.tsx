import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from './Tabs';
import { Cities } from '../../Constants';
import { withHistory } from '../../mocks/MockComponent';

describe('Component: Tabs', () => {
  const selectedCity = 'Paris';

  it('should render list of cities with selected city as active', () => {
    const preparedComponent = withHistory(<Tabs selectedCity={selectedCity} onClick={() => {}} />);
    const tabsItemPattern = /tabs-item-/i;
    render(preparedComponent);

    const tabs = screen.getByTestId('tabs');
    const tabsItems = screen.getAllByTestId(tabsItemPattern);

    expect(tabs).toBeInTheDocument();
    expect(tabsItems.length).toEqual(Cities.length);
    tabsItems.forEach((tabItem, index) => {
      const city = Cities[index];
      expect(tabItem.textContent).toContain(city);

      if (city === selectedCity) {
        expect(tabItem).toHaveClass('tabs__item--active');
      } else {
        expect(tabItem).not.toHaveClass('tabs__item--active');
      }
    });
  });

  it('should call onClick handler when a city tab is clicked', () => {
    const onClickMock = vitest.fn();
    const preparedComponent = withHistory(<Tabs selectedCity={selectedCity} onClick={onClickMock} />);
    render(preparedComponent);

    const cityLink = screen.getByTestId(`tabs-item-${selectedCity}`);
    fireEvent.click(cityLink);

    expect(onClickMock).toHaveBeenCalledWith(selectedCity);
  });
});
