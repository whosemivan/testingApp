import React, { useState } from 'react';
import './signUp.css';
import axios from 'axios';
import browserHistory from "../../browser-history";

const SignUp = ({setToken, setIsAuth, setRole}) => {
    const [userData, setUserData] = useState({ email: '', firstName: '', lastName: '', middleName: '', password: '' });

    const onSubmitBtnClick = (evt) => {
        evt.preventDefault();

        const data = {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            middleName: userData.middleName,
            password: userData.password
        };


        axios
            .post('https://ithub-quiz-platform.herokuapp.com/api/v1/auth/signup', data)
            .then((response) => {
                if (response.status === 200) {
                    setIsAuth(true);
                    setToken(response.data.result.token);
                    setRole(response.data.result.role);
                    browserHistory.push(`/main`);
                }
            });
    };

    return (
        <div className='form-container'>
            <form onSubmit={onSubmitBtnClick} className='form'>
                <h2 className='form__title'>Зарегистрироваться</h2>
                <div className='form__wrapper'>
                    <label className='form__label' htmlFor="login">Email</label>
                    <input type="email" id='email' name='email' className='form__input' placeholder='Ваш email' onChange={(value) => setUserData({ ...userData, email: value.target.value })} />
                </div>
                <div className='form__wrapper'>
                    <label className='form__label' htmlFor="name">Имя</label>
                    <input type="text" id='name' name='name' className='form__input' placeholder='Ваше имя' onChange={(value) => setUserData({ ...userData, firstName: value.target.value })} />
                </div>
                <div className='form__wrapper'>
                    <label className='form__label' htmlFor="username">Фамилия</label>
                    <input type="text" id='username' name='username' className='form__input' placeholder='Ваша фамилия' onChange={(value) => setUserData({ ...userData, lastName: value.target.value })} />
                </div>
                <div className='form__wrapper'>
                    <label className='form__label' htmlFor="middleName">Отчество</label>
                    <input type="text" id='middleName' name='middleName' className='form__input' placeholder='Ваша фамилия' onChange={(value) => setUserData({ ...userData, middleName: value.target.value })} />
                </div>
                <div className='form__wrapper'>
                    <label className='form__label' htmlFor="password">Пароль</label>
                    <input type="password" id='password' name='password' className='form__input' placeholder='Ваш пароль' onChange={(value) => setUserData({ ...userData, password: value.target.value })} />
                </div>
                <button className='form__btn' type='submit'>Войти</button>
            </form>
        </div>
    );
};

export default SignUp;