import React, {useState} from 'react';
import './testCreator.css';
import axios from 'axios';
import browserHistory from "../../browser-history";
import { Link } from 'react-router-dom';

const TestCreator = ({token}) => {
    const [userData, setUserData] = useState({ maxPassCount: 10, name: '' });

    const onSubmitBtnClick = (evt) => {
        evt.preventDefault();

        const data = {
            maxPassCount: userData.maxPassCount,
            name: userData.name,
        };

        axios
            .post('https://ithub-quiz-platform.herokuapp.com/api/v1/quiz', data, {headers: {
                'Authorization': `Bearer ${token}`
            }})
            .then((response) => {
                if (response.status === 200) {
                    browserHistory.push(`/questionCreator/${response.data.result.id}`);
                }

            });
    };


    return (
        <div className='container'>
        <div className='test-creator'>
            <h1>Страница создания теста</h1>
            <form onSubmit={onSubmitBtnClick} className='test-creator__form'>
                <input className='test-container__input' type="number" placeholder='Максимальное количество попыток' />
                <input className='test-container__input' type="text" placeholder='Название теста' onChange={(value) => setUserData({ ...userData, name: value.target.value })} />
                <button className='test-container__btn' type='submit'>Создать</button>
            </form>
            <Link className='test__link' to={`/main`}>Назад</Link>
        </div>
        </div>
    );
};

export default TestCreator;