import React from 'react';
import './main.css';
import {Link} from 'react-router-dom';

const Main = () => {
    return (
        <div className='main'>
            <Link to="/allTests" className='main__btn'>
                Тесты
            </Link>
            <Link to="/testCreator" className='main__btn'>
                Создать тест
            </Link>
        </div>
    );
};

export default Main;