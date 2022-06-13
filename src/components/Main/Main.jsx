import React, {useEffect} from 'react';
import './main.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Main = ({setToken, setIsAuth}) => {
    const logOut = () => {
        sessionStorage.clear();
        setIsAuth(false);
        setToken();
    }

    return (
        <div className='main'>
            <Link to="/allTests" className='main__btn'>
                Тесты
            </Link>
            <Link to="/testCreator" className='main__btn'>
                Создать тест
            </Link>
            <Link to="/allUsers" className='main__btn'>
                Все пользователи
            </Link>
            <Link to="/" onClick={() => logOut()} className='main__btn'>
                Выйти
            </Link>
        </div>
    );
};

export default Main;


