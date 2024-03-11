import { Link } from 'react-router-dom';
import { AppRoutes } from '../../Constants';
import './styles.css';

export default function NotFoundPage() {
  return (
    <main className="page__main">
      <div className="page__not_found container">
        <h3 className='not_found__title'>Page not found</h3>
        <Link className='button form__submit' to={AppRoutes.Main}>Go to home page</Link>
      </div>
    </main>
  );
}
