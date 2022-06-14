import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import browserHistory from "../../browser-history";

const QuestionEditor = ({ token }) => {
    const { id } = useParams();
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState([{ id: 0, isCorrect: false, value: '' }, { id: 1, isCorrect: true, value: '' }]);
    const [quizId, setQuizId] = useState();

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


    useEffect((() => {
        axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/question/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setQuizId(response.data.result.quizId);
        })
    }), [id, token])

    const onSubmitBtnClick = (evt) => {
        evt.preventDefault();


        const data = {
            id: Date.now(),
            answers: {},
            name: question,
            quizId: quizId
        };

        for (let i = 0; i < answers.length; ++i) {
            data.answers[i + 1] = {
                isCorrect: answers[i].isCorrect,
                value: answers[i].value
            }
        }


        axios
            .put(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/question/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    inputQuestion.current.value = '';
                    alert('Вопрос изменён!');
                    browserHistory.push(`/allTests`);
                }
            }).catch((err) => console.log(err.response));
    };

    return (
        <div className='container'>
            <div className='question-creator'>
                <h1>Страница изменения вопроса</h1>
                <p className='question-creator__text'>Галочкой отмечайте правильный вариант ответа</p>
                <form onSubmit={onSubmitBtnClick} className='question-creator__form'>
                    <input className='question-creator__input' ref={inputQuestion} type="text" placeholder='Формулировка вопроса' onChange={(value) => setQuestion(value.target.value)} />

                    {answers.map((answer, index) => {
                        return (
                            <div key={index}>
                                <label className='question-creator__label' htmlFor="answer">Вариант ответа</label>
                                <input className='question-creator__input' id="answer" name="answer" type="text" placeholder="Ответ" onChange={(value) => onChangeInput(index, value.target.value)} />
                                <input className='question-creator__checkbox' type="checkbox" defaultChecked={answer.isCorrect} onChange={() => onChangeCheckbox(index, !answer.isCorrect)} />
                            </div>
                        );

                    })}


                    <button className='question-creator__btn' onClick={() => setAnswers([...answers, { id: Object.keys(answers).length, isCorrect: false, value: '' }])} type="button" >Добавить ещё один вариант ответа</button>
                    <button className='question-creator__btn' type="submit">Изменить</button>
                </form>
                <Link className='question-creator__link' to='/main'>Закончить и вернуться назад</Link>
            </div>
        </div>
    );
};

export default QuestionEditor;