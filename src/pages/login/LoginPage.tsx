import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AppRoutes, AuthorizationStatus, Cities } from '../../Constants';
import { useEffect, useMemo } from 'react';
import { LoginForm } from './LoginForm';
import { randomChoice } from '../../services/utils';
import { changeCity } from '../../store/city/CitySlice';

export function LoginPage() {
  const authStatus = useAppSelector((state) => state.auth.authorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoutes.Main);
    }
  }, [authStatus, navigate]);

  const randomCity = useMemo(() => randomChoice(Cities), []);

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
              <Link
                className="locations__item-link"
                to={AppRoutes.Main}
                onClick={() => dispatch(changeCity(randomCity))}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
