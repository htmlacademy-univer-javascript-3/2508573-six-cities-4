import cn from 'classnames';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../Constants';
import { useAppSelector } from '../store/hooks';

export default function Layout() {
  const location = useLocation();
  const pageClasses = cn('page', {
    'page--gray page--main': location.pathname === AppRoutes.Main,
    'page--gray page--login': location.pathname === AppRoutes.Login,
  });
  const authStatus = useAppSelector((state) => state.auth.authorizationStatus);
  const user = useAppSelector((state) => state.auth.user);
  const favoriteCount = useAppSelector(
    (state) => state.offers.favorites.length
  );

  return (
    <div className={pageClasses}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                to={AppRoutes.Main}
                className="header__logo-link header__logo-link--active"
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authStatus === AuthorizationStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link
                        to={AppRoutes.Favorites}
                        className="header__nav-link header__nav-link--profile"
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                          {user.email}
                        </span>
                        <span className="header__favorite-count">
                          {favoriteCount}
                        </span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link to={'#'} className="header__nav-link">
                        {/* TODO: log out */}
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoutes.Login}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
