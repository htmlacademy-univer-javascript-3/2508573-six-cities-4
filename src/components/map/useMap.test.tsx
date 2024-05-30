import { renderHook } from '@testing-library/react';
import { useMap } from './useMap';
import leaflet from 'leaflet';
import React from 'react';
import { generatePoint } from '../../mocks/Location';
import { Point } from '../../entities/Point';

describe('Hook: useMap', () => {
  let mapRef: React.MutableRefObject<null>;
  let city: Point;
  let mapMockFn = vi.spyOn(leaflet, 'map');
  let tileLayerMockFn = vi.spyOn(leaflet, 'tileLayer');

  beforeEach(() => {
    mapRef = React.createRef();
    city = generatePoint();

    mapMockFn = vi.spyOn(leaflet, 'map');
    tileLayerMockFn = vi.spyOn(leaflet, 'tileLayer');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize map', () => {
    renderHook(() => useMap(mapRef, city), {
      wrapper: ({ children }) => <div ref={mapRef}>{children}</div>,
    });

    expect(mapMockFn).toHaveBeenCalledWith(mapRef.current, expect.any(Object));
  });

  it('should add tile layer to map', () => {
    renderHook(() => useMap(mapRef, city), {
      wrapper: ({ children }) => <div ref={mapRef}>{children}</div>,
    });

    expect(tileLayerMockFn).toHaveBeenCalled();
  });
});
