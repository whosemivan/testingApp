import React, { useState } from 'react';
import './signIn.css';
import axios from 'axios';
import browserHistory from "../../browser-history";

const SignIn = ({setToken, setIsAuth, setRole}) => {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const onSubmitBtnClick = (evt) => {
        evt.preventDefault();

        const data = {
            password: password,
            username: login
        };


        axios
            .post('https://ithub-quiz-platform.herokuapp.com/api/v1/auth/signin', data)
            .then((response) => {
                if (response.status === 200) {
                    setIsAuth(true);
                    setToken(response.data.result.token);
                    setRole(response.data.result.role);
                    browserHistory.push(`/main`);
                }
            }).catch((e) => console.log(e));
    };

    return (
        <>
            <form onSubmit={onSubmitBtnClick} className='form'>
                <h2 className='form__title'>Войти</h2>
                <div className='form__wrapper'>
                    <label className='form__label' htmlFor="login">Логин</label>
                    <input type="text" id='login' name='login' className='form__input' placeholder='Ваш логин' onChange={(value) => setLogin(value.target.value)} />
                </div>
                <div className='form__wrapper'>
                    <label className='form__label' htmlFor="password">Пароль</label>
                    <input type="password" id='password' name='password' className='form__input' placeholder='Ваш пароль' onChange={(value) => setPassword(value.target.value)} />
                </div>
                <button className='form__btn' type='submit'>Войти</button>
            </form>
        </>
    );
};

export default SignIn;