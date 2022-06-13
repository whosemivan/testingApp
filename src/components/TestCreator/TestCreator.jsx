import React, {useEffect, useState} from 'react';
import './testCreator.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import browserHistory from "../../browser-history";

const TestCreator = ({token}) => {
    const [userData, setUserData] = useState({ maxPassCount: 10, name: '' });

    const onSubmitBtnClick = (evt) => {
        evt.preventDefault();

        const data = {
            maxPassCount: userData.maxPassCount,
            name: userData.name,
        };

        console.log(data);


        axios
            .post('https://ithub-quiz-platform.herokuapp.com/api/v1/quiz', data, {headers: {
                'Authorization': `Bearer ${token}`
            }})
            .then((response) => {
                console.log(response.data);

                if (response.status === 200) {
                    browserHistory.push(`/questionCreator/${response.data.result.id}`);
                }

            });
    };


    return (
        <div className='test-creator'>
            <h1>Страница создания теста</h1>
            <form onSubmit={onSubmitBtnClick} className='test-creator__form'>
                <input type="number" placeholder='Максимальное количество попыток' />
                <input type="text" placeholder='Название теста' onChange={(value) => setUserData({ ...userData, name: value.target.value })} />
                <button type='submit'>Создать</button>
            </form>
        </div>
    );
};

export default TestCreator;