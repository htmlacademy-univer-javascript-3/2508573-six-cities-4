import { Navigate, Outlet } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../Constants';

type PrivateRouteProps = {
  authStatus: AuthorizationStatus;
};

export default function PrivateRoute({ authStatus } : PrivateRouteProps) {
  return (
    authStatus === AuthorizationStatus.Auth
      ? <Outlet />
      : <Navigate to={AppRoutes.Login} />
  );
}
