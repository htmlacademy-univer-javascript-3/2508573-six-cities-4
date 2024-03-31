import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '../../entities/Location';
import { useEffect, useRef } from 'react';
import { useMap } from './useMap';
import { currentCustomIcon, defaultCustomIcon } from '../../Constants';
import { Nullable } from 'vitest';

type MapProps = {
  city: Location;
  selected: Nullable<Location>;
  points: Location[];
};

export default function Map({ city, selected, points }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city.point);

  useEffect(() => {
    if (map) {
      points.forEach((loc) => {
        leaflet
          .marker(
            {
              lat: loc.point.latitude,
              lng: loc.point.longitude,
            },
            {
              icon:
                loc.name === selected?.name
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [map, points, selected]);

  return (
    <div style={{ height: '500px' }} ref={mapRef} className="cities__map" />
  );
}
