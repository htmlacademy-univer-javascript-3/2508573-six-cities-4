import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Offer } from '../../entities/Offer';
import { Review } from '../../entities/Review';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchFullOffer } from '../../store/ApiActions';

type OfferPageState = {
  offer: Offer | undefined;
  reviews: Review[];
  nearbyOffers: Offer[];
  isError: boolean;
  isLoading: boolean;
};

export function useOfferPage(): OfferPageState {
  const { offerId } = useParams<{ offerId?: string }>();
  const dispatch = useAppDispatch();
  const currentOfferState = useAppSelector((state) => state.currentOffer);
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (offerId === undefined) {
      setError(true);
      return;
    }
    dispatch(fetchFullOffer(offerId));
  }, [dispatch, offerId]);

  return { ...currentOfferState, isError: currentOfferState.isError || isError};
}
