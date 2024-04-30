﻿import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import Tabs from '../../components/tabs/Tabs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeCityAction, fillOrdersAction } from '../../store/Actions';
import cn from 'classnames';
import { OfferList, EmptyOfferList } from './OfferList';

export function HomePage() {
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) =>
    state.offers.filter((o) => o.city.name === city)
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fillOrdersAction());
  });

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs
          selectedCity={city}
          onClick={(c) => dispatch(changeCityAction(c))}
        />
        <div className="cities">
          <div
            className={cn('cities__places-container', 'container', {
              'cities__places-container--empty': offers.length === 0,
            })}
          >
            {offers.length > 0 ? (
              <OfferList offers={offers} city={offers[0].city} />
            ) : (
              <EmptyOfferList city={city} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
