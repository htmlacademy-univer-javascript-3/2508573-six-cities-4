import leaflet from 'leaflet';

export const AppRoutes = {
  Main: '/',
  Login: '/login',
  Offer: '/offer/:id',
  Favorites: '/favorites',
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const DEFAULT_MAP_ZOOM = 12;

export const defaultCustomIcon = leaflet.icon({
  iconUrl:
    '/public/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [27, 20],
});

export const currentCustomIcon = leaflet.icon({
  iconUrl:
  '/public/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [27, 20],
});
