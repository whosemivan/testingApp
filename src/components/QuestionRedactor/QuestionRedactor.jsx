import React, { useState, useEffect } from 'react';
import './questionRedactor.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import browserHistory from "../../browser-history";

const QuestionRedactor = ({ token }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    // Получает все вопросы

    useEffect(() => {
        axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}/questions`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setIsLoad(true);
                setData(response.data.result);
            }
        });
    }, [id, token]);


    const onDeleteQuestionBtnClick = (id) => {
        axios.delete(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/question/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                alert('Вопрос удалён!');
                browserHistory.push(`/allTests`);
            }
        });
    };

    return (
        <div className='container'>
            <div className='question-creator'>
                <h1>Страница изменения вопросов</h1>
                <p className='question-creator__text'>Выберите вопрос, который хотели бы изменить</p>
                {isLoad ? data.map((question, index) => {
                    return(
                        <div className='question-block' key={index}>
                            <p className='question-block__name'>{question.name}</p>
                            <Link className='question-block__link' to={`/questionEditor/${question.id}`}>Изменить</Link>
                            <button className='question-block__link' onClick={() => onDeleteQuestionBtnClick(question.id)}>Удалить</button>
                        </div>
                    );
                }) : <p>Загрузка...</p>}
                <Link className='question-creator__link' to='/main'>Закончить и вернуться назад</Link>
            </div>
        </div>
    );
};

export default QuestionRedactor;
