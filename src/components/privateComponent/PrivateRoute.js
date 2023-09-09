import { useClerk } from "@clerk/clerk-react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ element, ...rest }) {
  const { user } = useClerk();

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
}