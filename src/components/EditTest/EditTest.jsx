import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditTest = ({token}) => {
    const [userData, setUserData] = useState({ maxPassCount: 10, name: '' });
    const { id } = useParams(); 

    const onSubmitBtnClick = (evt) => {
        evt.preventDefault();

        const data = {
            maxPassCount: userData.maxPassCount,
            name: userData.name,
        };

        axios
            .put(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}`, data, {headers: {
                'Authorization': `Bearer ${token}`
            }})
            .then((response) => {
                console.log(response);
            });
    };


    return (
        <div className='container'>
        <div className='test-creator'>
            <h1>Страница изменения теста</h1>
            <form onSubmit={onSubmitBtnClick} className='test-creator__form'>
                <input className='test-container__input' type="number" placeholder='Максимальное количество попыток' />
                <input className='test-container__input' type="text" placeholder='Название теста' onChange={(value) => setUserData({ ...userData, name: value.target.value })} />
                <button className='test-container__btn' type='submit'>Изменить</button>
            </form>
            <Link className='test__link' to={`/main`}>Назад</Link>
        </div>
        </div>
    );
};

export default EditTest;