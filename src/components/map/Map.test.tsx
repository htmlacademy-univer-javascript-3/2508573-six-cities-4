import { render, screen } from '@testing-library/react';
import Map from './Map';
import { generateLocation } from '../../mocks/Location';

describe('Component: Map', () => {
  const mapContainerId = 'map';

  it('should render correctly with given city and points', () => {
    const mockCity = generateLocation();
    const mockPoints = Array.from({ length: 3 }, generateLocation);

    render(<Map city={mockCity} points={mockPoints} />);

    const mapContainer = screen.getByTestId(mapContainerId);
    expect(mapContainer).toBeInTheDocument();
  });

  it('should render correctly with selected location', () => {
    const mockCity = generateLocation();
    const mockPoints = Array.from({ length: 3 }, generateLocation);
    const mockSelected = generateLocation();

    render(<Map city={mockCity} points={mockPoints} selected={mockSelected} />);

    const mapContainer = screen.getByTestId(mapContainerId);
    expect(mapContainer).toBeInTheDocument();
  });

  it('should render correctly without points', () => {
    const mockCity = generateLocation();

    render(<Map city={mockCity} points={[]} />);

    const mapContainer = screen.getByTestId(mapContainerId);
    expect(mapContainer).toBeInTheDocument();
  });
});
