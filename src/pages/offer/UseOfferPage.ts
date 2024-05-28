import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Offer } from '../../entities/Offer';
import { Review } from '../../entities/Review';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchOffer } from '../../store/ApiActions';

type OfferPageState = {
  offer: Offer | undefined;
  reviews: Review[];
  nearbyOffers: Offer[];
  error: string | Error | undefined;
  isLoading: boolean;
};

export function useOfferPage(): OfferPageState {
  const { offerId } = useParams<{ offerId?: string }>();
  const dispatch = useAppDispatch();
  const currentOfferState = useAppSelector((state) => state.currentOffer);
  const [state, setState] = useState<
    Pick<OfferPageState, 'error' | 'isLoading'>
  >({ error: undefined, isLoading: true });

  useEffect(() => {
    if (offerId === undefined) {
      setState((s) => ({ ...s, error: new Error('Invalid offerId') }));
      return;
    }
    setState((s) => ({ ...s, isLoading: true }));
    dispatch(fetchOffer(offerId))
      .unwrap()
      .then(() => {
        setState((s) => ({ ...s, isLoading: false }));
      })
      .catch((e) => {
        if (e instanceof Error || typeof e === 'string') {
          setState((s) => ({ ...s, error: e, isLoading: false }));
        }
      });
  }, [dispatch, offerId]);

  return { ...currentOfferState, ...state };
}
