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
