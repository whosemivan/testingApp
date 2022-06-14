import React from 'react';
import {Route, Redirect} from 'react-router-dom';


const PrivateRoute = ({render, path, exact, authorizationStatus, pageForUser=true, role="ROLE_USER"}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        if (authorizationStatus === true) {
          if (pageForUser === true) return (render(routeProps));
          if (pageForUser === false && role === "ROLE_ADMIN") return (render(routeProps));
        }
        return (<Redirect to='/' />);
      }}
    />
  );
};

export default PrivateRoute;