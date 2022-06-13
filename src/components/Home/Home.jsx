import React from 'react';
import SignIn from '../SignIn/SignIn';
import './home.css';
import {Link} from 'react-router-dom';

const Home = ({setToken ,setIsAuth}) => {
    return (
        <div className='home'>
            <h1>Добро пожаловать!</h1>
            <SignIn setToken={setToken} setIsAuth={setIsAuth} />
            <Link to="/signup">Нет аккаунта? Зарегистрироваться!</Link>
        </div>
    );
};

export default Home;