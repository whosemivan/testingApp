import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './allTests.css';
import { Link } from 'react-router-dom';

const AllTests = ({ token, role }) => {
  const [tests, setTests] = useState();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz`).then((response) => {
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
        setTests(tests.filter((data) => data.id !== id));
      }).catch((err) => console.log(err.response));
  };

  return (
    <div className='test-block'>
      <h1>Все доступные тесты</h1>
      <Link className='test-block__link-back' to='/main'>Назад</Link>
      {isLoad ? tests.map((test) => {
        return (
          <div className='test-block__block' key={test.id}>
            <h3>{test.name}</h3>
            {
              role === "ROLE_ADMIN" &&
              <React.Fragment>
                <button className='test-block__btn' onClick={() => onDeleteBtnClick(test.id)} type='button'>Удалить</button>
                <Link to={`/editTest/${test.id}`} className='test-block__btn'>Изменить</Link>
                <Link to={`/questionRedactor/${test.id}`} className='test-block__btn'>Редактировать вопросы</Link>
              </React.Fragment>
            }
            <Link className='test-block__link' to={`/allTests/${test.id}`}>Пройти тест</Link>
          </div>
        );
      }) : <p>Загрузка...</p>}
    </div>
  );
};

export default AllTests;