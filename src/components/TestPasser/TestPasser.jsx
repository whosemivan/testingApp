import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import './testPasser.css';
import { useParams } from 'react-router-dom';


const TestPasser = ({ token }) => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [isLoad, setIsLoad] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);

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
        } else {
            console.log(answers);
            axios
                .post(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}/pass`, answers, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log(response.data);
                }).catch((err) => console.log(err.response));
        };
    }

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
                </div>
            ) : (<p>Загрузка...</p>)}

        </div>
    );
}


export default TestPasser;
