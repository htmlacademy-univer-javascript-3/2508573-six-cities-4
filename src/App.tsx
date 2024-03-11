import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { AppRoutes, AuthorizationStatus } from './Constants';
import { OfferPage } from './pages/offer/OfferPage';
import { LoginPage } from './pages/login/LoginPage';
import { FavouritesPage } from './pages/favourites/FavouritesPage';
import Layout from './components/Layout';
import NotFoundPage from './pages/notfound/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import { HelmetProvider } from 'react-helmet-async';

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              path={AppRoutes.Main}
              element={<HomePage cardsCount={5} />}
            />
            <Route
              path={AppRoutes.Offer}
              element={<OfferPage />}
            />
            <Route element={<PrivateRoute authStatus={AuthorizationStatus.NoAuth} />}>
              <Route
                path={AppRoutes.Favorites}
                element={<FavouritesPage />}
              />
            </Route>
            <Route
              path={AppRoutes.Login}
              element={<LoginPage />}
            />
            <Route
              path='*'
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
