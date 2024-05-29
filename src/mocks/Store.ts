import { AuthorizationStatus } from '../Constants';
import { State } from '../entities/State';

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  auth: {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
  },
  city: {
    city: 'Paris',
  },
  currentOffer: {
    offer: undefined,
    isError: false,
    reviews: [],
    nearbyOffers: [],
    isLoading: false,
  },
  error: { messages: [] },
  offers: {
    offers: [],
    sortingOrder: 'Popular',
    offersLoadingStatus: false,
    favorites: [],
  },
  ...(initialState ?? {}),
});
