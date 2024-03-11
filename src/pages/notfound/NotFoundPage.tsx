import { Link } from 'react-router-dom';
import { AppRoutes } from '../../Constants';
import './styles.css';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>6 cities: not found</title>
      </Helmet>
      <main className="page__main">
        <div className="page__not_found container">
          <h3 className='not_found__title'>Page not found</h3>
          <Link className='button form__submit' to={AppRoutes.Main}>Go to home page</Link>
        </div>
      </main>
    </>
  );
}
