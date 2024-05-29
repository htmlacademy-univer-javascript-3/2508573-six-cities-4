import { Link } from 'react-router-dom';
import { AppRoutes } from '../../Constants';
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>6 cities: not found</title>
      </Helmet>
      <main className="page__main" data-testid="notfoundpage">
        <div className={cn(styles.page__not_found, 'container')}>
          <h3 className={styles.not_found__title}>Page not found</h3>
          <Link className='button form__submit' to={AppRoutes.Main} data-testid="notfoundpage__goto-home">Go to home page</Link>
        </div>
      </main>
    </>
  );
}
