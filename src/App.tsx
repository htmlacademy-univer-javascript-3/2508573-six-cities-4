import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { AppRoutes, AuthorizationStatus } from './Constants';
import { OfferPage } from './pages/offer/OfferPage';
import { LoginPage } from './pages/login/LoginPage';
import { FavouritesPage } from './pages/favourites/FavouritesPage';
import Layout from './components/Layout';
import NotFoundPage from './pages/notfound/NotFoundPage';
import PrivateRoute from './components/routes/PrivateRoute';
import { HelmetProvider } from 'react-helmet-async';
import { Offer } from './entities/Offer';
import { Review } from './entities/Review';
import { Provider } from 'react-redux';
import { store } from './store/Index';

type AppProps = {
  offers: Offer[];
  reviews: Review[];
};

export function App({ offers, reviews }: AppProps) {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index path={AppRoutes.Main} element={<HomePage />} />
              <Route
                path={AppRoutes.Offer}
                element={
                  <OfferPage
                    offer={offers[0]}
                    reviews={reviews}
                    nearbyOffers={offers}
                    authStatus={AuthorizationStatus.Auth}
                  />
                }
              />
              <Route
                element={<PrivateRoute authStatus={AuthorizationStatus.Auth} />}
              >
                <Route
                  path={AppRoutes.Favorites}
                  element={
                    <FavouritesPage
                      offers={offers.filter((x) => x.isFavorite)}
                    />
                  }
                />
              </Route>
              <Route path={AppRoutes.Login} element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
