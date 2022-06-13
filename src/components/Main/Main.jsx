import React from 'react';
import './main.css';
import {Link} from 'react-router-dom';

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
            <Link to="/" onClick={() => logOut()} className='main__btn'>
                Выйти
            </Link>
        </div>
    );
};

export default Main;


