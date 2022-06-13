import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import './testPasser.css';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

const TestPasser = ({ token }) => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [isLoad, setIsLoad] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState();
    const [isPopup, setIsPopup] = useState(false);

    // Получает все вопросы
    useEffect(() => {
        axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}/questions`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                setIsLoad(true);
                setData(response.data.result);
            }
        });
    }, []);

    useEffect(() => { console.log(answers) }, [answers]);

    // срабатывает при клике на варинат ответа
    const handleAnswerBtnClick = (questionId, value) => {
        const nextQuestion = currentQuestion + 1;

        setAnswers([...answers, { questionId: questionId, value: value }]);
        console.log(answers);

        if (isLoad && nextQuestion < data.length) {
            setCurrentQuestion(nextQuestion);
        }
    }


    const handleSubmitClick = () => {
        axios
        .post(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}/pass`, answers, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data.result);
            if (response.status) {
                setResult(response.data.result.result);
                setIsPopup(true);
            }
        }).catch((err) => console.log(err.response));
    };



    // возращает все пройденные тесты
    // useEffect(() => {
    //     axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/passed`, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     }).then((response) => {
    //       console.log(response.data);
    //     });
    //   }, []);


    return (
        <div>
            <h4>Страница прохождения теста</h4>
            {isLoad ? (
                <div>
                    <div className='question'>
                        <div>
                            <span>Вопрос {currentQuestion + 1}</span>/{data.length}
                        </div>
                        <p>{data[currentQuestion].name}</p>
                    </div>
                    <div className='answers'>
                        {Object.keys(data[currentQuestion].answers).map((key, index) => {
                            let value = data[currentQuestion].answers[key].value;
                            return (
                                <button key={index} onClick={() => {
                                    handleAnswerBtnClick(data[currentQuestion].id, data[currentQuestion].answers[key].value);
                                }}>
                                    {value}
                                </button>
                            );
                        })}
                    </div>
                    <button onClick={handleSubmitClick}>Отправить</button>
                </div>
            ) : (<p>Загрузка...</p>)}
            <div className={isPopup ? 'popup--view' : 'popup'}>
                <h4>Ваш результат - {result}/{isLoad ? data.length : 'Загрузка...'}</h4>
                <Link to="/allTests">Верунться на страницу тестов</Link>
            </div>
        </div>
    );
}


export default TestPasser;
