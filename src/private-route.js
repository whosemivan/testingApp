import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({render, path, exact, authorizationStatus}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          authorizationStatus === true
            ? render(routeProps)
            : <Redirect to='/' />
        );
      }}
    />
  );
};

export default PrivateRoute;