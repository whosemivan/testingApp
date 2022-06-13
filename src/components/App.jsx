import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SignUp from './SignUp/SignUp';
import Main from './Main/Main';
import NotFound from './NotFound/NotFound';
import Home from './Home/Home';
import AllTests from './AllTests/AllTests';
import Test from './Test/Test';
import TestPasser from './TestPasser/TestPasser';
import TestCreator from './TestCreator/TestCreator';
import QuestionCreator from './QuestionCreator/QuestionCreator';

import browserHistory from "../browser-history";
import PrivateRoute from '../private-route';


import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';


const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState();


    return (
        <BrowserRouter history={browserHistory}>
        <Switch>
          <Route exact path='/'>
            <Home setToken={setToken} setIsAuth={setIsAuth} />
          </Route>
          <Route exact path='/signup'>
            <SignUp setToken={setToken} setIsAuth={setIsAuth}/>
          </Route>
          <PrivateRoute exact
            path='/main'
            render={() => <Main />}
            authorizationStatus={isAuth}
          />
          <PrivateRoute exact
            path='/allTests'
            render={() => <AllTests token={token} />}
            authorizationStatus={isAuth}
          />
          <PrivateRoute exact
            path='/allTests/:id'
            render={() => <Test />}
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
          />
          <PrivateRoute exact
            path='/questionCreator/:id'
            render={() => <QuestionCreator token={token} />}
            authorizationStatus={isAuth}
          />
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
};

export default App;