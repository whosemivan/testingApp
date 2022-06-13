import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './test.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Test = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [isLoad, setIsLoad] = useState(false);

    console.log(id);

    useEffect(() => {
        axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}`).then((response) => {
            setData(response.data.result);
            setIsLoad(true);
        });

    }, []);

    if (isLoad) {
        return (
            <div>
                <h4>{data.name}</h4>
                <p>Осталось попыток: {data.maxPassCount}</p>
                <Link to={`/allTests/${id}/testPasser`}>Пройти</Link>
            </div>
        );
    } else {
        return (
            <p>Загрузка...</p>
        );
    }

};

export default Test;