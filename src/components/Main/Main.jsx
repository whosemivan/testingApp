import React from 'react';
import './main.css';
import {Link} from 'react-router-dom';

const Main = ({setToken, setIsAuth, setRole, role}) => {
    const logOut = () => {
        document.cookie = `token=; exprices=; max-age=-1`;
        document.cookie = `role=; exprices=; max-age=-1`;
        setIsAuth(false);
        setToken();
        setRole();
    }

    return (
        <div className='main'>
            <Link to="/allTests" className='main__btn'>
                Тесты
            </Link>
            {role === "ROLE_ADMIN" && <Link to="/testCreator" className='main__btn'>Создать тест</Link>}
            {role === "ROLE_ADMIN" && <Link to="/allUsers" className='main__btn'>Все пользователи</Link>}
            <Link to="/" onClick={() => logOut()} className='main__btn'>
                Выйти
            </Link>
        </div>
    );
};

export default Main;


