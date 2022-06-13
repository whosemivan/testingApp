import React, { useEffect, useState, useRef } from 'react';
import './questionCreator.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuestionCreator = ({ token }) => {
    const { id } = useParams();
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState([{ id: 0, isCorrect: false, value: '' }, { id: 1, isCorrect: true, value: '' }]);
    const [questionsCount, setQuestionsCount] = useState();
    
    const inputQuestion = useRef(null);

    const onChangeInput = (index, value) => {
        setAnswers(prevState =>
            prevState.map(item =>
                item.id === index
                    ? { ...item, value: value }
                    : item
            )
        )
    }

    const onChangeCheckbox = (index, isCorrect) => {
        setAnswers(prevState =>
            prevState.map(item =>
                item.id === index
                    ? { ...item, isCorrect: isCorrect }
                    : item
            )
        )
    }

    // получаю весь список вопросов, чтобы правильно расставлять id

    useEffect(() => {
        axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}/questions`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setQuestionsCount(response.data.result.length);
        });
    }, []);


    const onSubmitBtnClick = (evt) => {
        evt.preventDefault();


        const data = {
            id: Date.now(),
            answers: {},
            name: question,
            quizId: +id
        };

        for (let i = 0; i < answers.length; ++i) {
            data.answers[i + 1] = {
                isCorrect: answers[i].isCorrect,
                value: answers[i].value
            }
        }


        axios
            .post('https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/question', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    inputQuestion.current.value = '';
                }
            }).catch((err) => console.log(err.response));
    };

    return (
        <div className='test-creator'>
            <h1>Страница создания вопросов</h1>
            <form onSubmit={onSubmitBtnClick} className='test-creator__form'>
                <input ref={inputQuestion} type="text" placeholder='Формулировка вопроса' onChange={(value) => setQuestion(value.target.value)} />

                {answers.map((answer, index) => {
                    return (
                        <div key={index}>
                            <label htmlFor="answer">Вариант ответа</label>
                            <input id="answer" name="answer" type="text" placeholder="Ответ" onChange={(value) => onChangeInput(index, value.target.value)} />
                            <input type="checkbox" defaultChecked={answer.isCorrect} onChange={() => onChangeCheckbox(index, !answer.isCorrect)} />
                        </div>
                    );

                })}


                <button onClick={() => setAnswers([...answers, { id: Object.keys(answers).length, isCorrect: false, value: '' }])} type="button" >Добавить ещё один вариант ответа</button>
                <button type="submit">Создать</button>
            </form>
        </div>
    );
};

export default QuestionCreator;