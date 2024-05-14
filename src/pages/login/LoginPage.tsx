import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { AppRoutes, AuthorizationStatus } from '../../Constants';
import { useEffect } from 'react';
import { LoginForm } from './LoginForm';

export function LoginPage() {
  const authStatus = useAppSelector((state) => state.auth.authorizationStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoutes.Main);
    }
  }, [authStatus, navigate]);

  return (
    <>
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
