import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ isLoggedIn, path, element }) {
  return (
    <Route
      path={path}
      element={isLoggedIn ? element : <Navigate to='/login' replace />}
    />
  );
}

export default PrivateRoute;
