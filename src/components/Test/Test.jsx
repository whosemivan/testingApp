import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './test.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Test = ({token}) => { 
    const { id } = useParams(); 
    const [data, setData] = useState(); 
    const [isLoad, setIsLoad] = useState(false); 
 
    useEffect(() => { 
        let name, maxPassCount, remainPassCount; 
        axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}`).then((response) => { 
            name = response.data.result.name; 
            maxPassCount = response.data.result.maxPassCount; 
 
            axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}/pass/can`, { 
                headers: { 
                    'Authorization': `Bearer ${token}`
                } 
            }).then((response) => { 
                if (response.data.result) { 
                    axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}/result`, { 
                        headers: { 
                            'Authorization': `Bearer ${token}`
                        } 
                    }).then((response) => { 
                        remainPassCount = maxPassCount - response.data.result.length; 
                        setData( 
                        <div className='container'>
                            <div className='test'> 
                                <h4 className='test__title'>{name}</h4> 
                                <p className='test__text'>Попыток осталось {remainPassCount}/{maxPassCount}</p> 
                                <Link className='test__link' to={`/allTests/${id}/testPasser`}>Пройти</Link> 
                            </div> 
                        </div>
                        ); 
                    }) 
                } else { 
                    setData( 
                        <div className='container'>
                        <div className='test'> 
                            <h4 className='test__title'>{name}</h4> 
                            <p className='test__text'>Попыток больше нет</p> 
                            <Link className='test__link' to={`/allTests`}>Верунться к тестам</Link> 
                        </div> 
                        </div>
                    ); 
                } 
                setIsLoad(true); 
            }) 
        }); 
    }, []); 
 
    if (isLoad) { 
        return ( 
            <div>{data}</div> 
        ); 
    } else { 
        return ( 
            <p>Загрузка...</p> 
        ); 
    } 
 
};

export default Test;



// const Test = () => {
    //     const { id } = useParams();
    //     const [data, setData] = useState();
    //     const [isLoad, setIsLoad] = useState(false);
    
    //     console.log(id);
    
    //     useEffect(() => {
    //         axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/quiz/${id}`).then((response) => {
    //             setData(response.data.result);
    //             setIsLoad(true);
    //         });
    
    //     }, [id]);
    
    //     if (isLoad) {
    //         return (
    //             <div className='container'>
    //                 <div className='test'>
    //                     <h4 className='test__title'>{data.name}</h4>
    //                     <p className='test__text'>Осталось попыток: {data.maxPassCount}</p>
    //                     <Link className='test__link' to={`/allTests/${id}/testPasser`}>Пройти</Link>
    //                 </div>
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <p>Загрузка...</p>
    //         );
    //     }
    
    // };