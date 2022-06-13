import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './allTests.css';
import {Link} from 'react-router-dom';

const AllTests = ({token}) => {
    const [tests, setTests] = useState();
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz`).then((response) => {
        console.log(response.data);    
        setTests(response.data.result);
        setIsLoad(true);
        });
    }, []);

    // const onDeleteBtnClick = (id) => {

    //   axios
    //       .delete(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}`, {
    //           headers: {
    //               'Authorization': `Bearer ${token}`
    //           }
    //       })
    //       .then((response) => {
    //           console.log(response.data);
    //       }).catch((err) => console.log(err.response));
    // };

      
    return (
        <div className='test-block'>
            <h1>Все доступные тесты</h1>
            {isLoad ? tests.map((test) => {
              return (
                <div key={test.id}>
                  <h3>{test.name}</h3>
                  <p>Максимальное количество попыток: {test.maxPassCount}</p>
                  <button>Удалить</button>
                  <button>Изменить</button>
                  <Link to={`/allTests/${test.id}`}>Пройти</Link>
                </div>
              );
            }) : <p>Загрузка...</p>}
        </div>
    );
};

export default AllTests;