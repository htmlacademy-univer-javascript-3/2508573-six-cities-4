import { Helmet } from 'react-helmet-async';
import FavoritesList from './FavoritesList';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import cn from 'classnames';

export function FavouritesPage() {
  const favorites = useAppSelector((state) => state.offers.favorites);
  const isEmpty = favorites.length === 0;

  return (
    <>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <main
        className={cn('page__main', 'page__main--favorites', {
          'page__main--favorites-empty': isEmpty,
        })}
      >
        <div className="page__favorites-container container">
          <section className={cn('favorites', { 'favorites--empty': isEmpty })}>
            {!isEmpty ? (
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <FavoritesList offers={favorites} />
              </>
            ) : (
              <>
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">
                    Save properties to narrow down search or plan your future
                    trips.
                  </p>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </>
  );
}
