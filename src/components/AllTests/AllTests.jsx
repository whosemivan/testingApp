import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './allTests.css';
import { Link } from 'react-router-dom';

const AllTests = ({ token }) => {
  const [tests, setTests] = useState();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz`).then((response) => {
      console.log(response.data);
      setTests(response.data.result);
      setIsLoad(true);
    });
  }, []);


  const onDeleteBtnClick = (id) => {
    axios
      .delete(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
      }).catch((err) => console.log(err.response));
  };

  console.log(tests);
  
  return (
    <div className='test-block'>
      <h1>Все доступные тесты</h1>
      {isLoad ? tests.map((test) => {
        return (
          <div className='test-block__block' key={test.id}>
            <h3>{test.name}</h3>
            <p className='test-block__text'>Максимальное количество попыток: {test.maxPassCount}</p>
            <button className='test-block__btn' onClick={() => onDeleteBtnClick(test.id)} type='button'>Удалить</button>
            <button className='test-block__btn'>Изменить</button>
            <Link className='test-block__link' to={`/allTests/${test.id}`}>Пройти тест</Link>
          </div>
        );
      }) : <p>Загрузка...</p>}
    </div>
  );
};

export default AllTests;