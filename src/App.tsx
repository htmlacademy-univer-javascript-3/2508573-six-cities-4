import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { AppRoutes } from './Constants';
import { OfferPage } from './pages/offer/OfferPage';
import { LoginPage } from './pages/login/LoginPage';
import { FavoritesPage } from './pages/favourites/FavoritesPage';
import Layout from './components/layout/Layout';
import NotFoundPage from './pages/notfound/NotFoundPage';
import PrivateRoute from './components/routes/PrivateRoute';
import { HelmetProvider } from 'react-helmet-async';

export function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index path={AppRoutes.Main} element={<HomePage />} />
          <Route path={AppRoutes.Offer} element={<OfferPage />} />
          <Route element={<PrivateRoute />}>
            <Route path={AppRoutes.Favorites} element={<FavoritesPage />} />
          </Route>
          <Route path={AppRoutes.Login} element={<LoginPage />} />
          <Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}
