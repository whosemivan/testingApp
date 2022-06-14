import React, { useEffect, useState } from 'react';

import SignUp from './SignUp/SignUp';
import Main from './Main/Main';
import NotFound from './NotFound/NotFound';
import Home from './Home/Home';
import AllTests from './AllTests/AllTests';
import Test from './Test/Test';
import TestPasser from './TestPasser/TestPasser';
import TestCreator from './TestCreator/TestCreator';
import QuestionCreator from './QuestionCreator/QuestionCreator';
import AllUsers from './AllUsers/AllUsers';
import EditTest from './EditTest/EditTest';

import browserHistory from "../browser-history";
import PrivateRoute from '../private-route';


import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';


const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    function getCookie(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    const tokenFromCookie = getCookie("token");
    const roleFromCookie = getCookie("role");
    let date = new Date(Date.now() + 432000e3);

    if (token && !tokenFromCookie) {
      document.cookie = `token=${JSON.stringify(token)}; exprices=${date.toUTCString()}`;
      document.cookie = `role=${JSON.stringify(role)}; exprices=${date.toUTCString()}`;
    } else if (!token && tokenFromCookie) {
      setIsAuth(true);
      setToken(JSON.parse(tokenFromCookie))
      setRole(JSON.parse(roleFromCookie))
      browserHistory.push('/main');
    }
  }, [token, role]);

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path='/'>
          <Home setToken={setToken} setIsAuth={setIsAuth} setRole={setRole} />
        </Route>
        <Route exact path='/signup'>
          <SignUp setToken={setToken} setIsAuth={setIsAuth} setRole={setRole} />
        </Route>
        <PrivateRoute exact
          path='/main'
          render={() => <Main setToken={setToken} setIsAuth={setIsAuth} role={role} setRole={setRole} />}
          authorizationStatus={isAuth}
        />
        <PrivateRoute exact
          path='/allTests'
          render={() => <AllTests token={token} role={role} />}
          authorizationStatus={isAuth}
        />
        <PrivateRoute exact
          path='/allTests/:id'
          render={() => <Test token={token} />}
          authorizationStatus={isAuth}
        />
        <PrivateRoute exact
          path='/allTests/:id/testPasser'
          render={() => <TestPasser token={token} />}
          authorizationStatus={isAuth}
        />
        <PrivateRoute exact
          path='/testCreator'
          render={() => <TestCreator token={token} />}
          authorizationStatus={isAuth}
          pageForUser={false}
          role={role}
        />
        <PrivateRoute exact
          path='/questionCreator/:id'
          render={() => <QuestionCreator token={token} />}
          authorizationStatus={isAuth}
          pageForUser={false}
          role={role}
        />
        <PrivateRoute exact
          path='/allUsers'
          render={() => <AllUsers token={token} />}
          authorizationStatus={isAuth}
        />
        <PrivateRoute exact
          path='/editTest/:id'
          render={() => <EditTest token={token} />}
          authorizationStatus={isAuth}
        />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;