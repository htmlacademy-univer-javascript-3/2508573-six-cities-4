import { Helmet } from 'react-helmet-async';
import FavoritesList from './FavoritesList';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';


export function FavouritesPage() {
  // TODO: Empty version
  const favorites = useAppSelector((state) => state.offers.favorites);

  return (
    <>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offers={favorites} />
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
