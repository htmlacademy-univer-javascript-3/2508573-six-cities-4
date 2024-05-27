import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { AppRoutes } from './Constants';
import { OfferPage } from './pages/offer/OfferPage';
import { LoginPage } from './pages/login/LoginPage';
import { FavouritesPage } from './pages/favourites/FavouritesPage';
import Layout from './components/layout/Layout';
import NotFoundPage from './pages/notfound/NotFoundPage';
import PrivateRoute from './components/routes/PrivateRoute';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store/Index';

export function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index path={AppRoutes.Main} element={<HomePage />} />
              <Route path={AppRoutes.Offer} element={<OfferPage />} />
              <Route element={<PrivateRoute />}>
                <Route
                  path={AppRoutes.Favorites}
                  element={<FavouritesPage />}
                />
              </Route>
              <Route path={AppRoutes.Login} element={<LoginPage />} />
              <Route path={AppRoutes.NotFound} element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
