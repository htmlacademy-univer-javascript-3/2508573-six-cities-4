import { Navigate, Outlet } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../Constants';
import { useAppSelector } from '../../store/hooks';

export default function PrivateRoute() {
  const authStatus = useAppSelector((state) => state.auth.authorizationStatus);
  return authStatus === AuthorizationStatus.Auth ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoutes.Login} />
  );
}
