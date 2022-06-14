import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './allUsers.css';

const AllUsers = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    // возращает всех юзеров
    useEffect(() => {
        axios.get(`https://ithub-quiz-platform.herokuapp.com/api/v1/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            setUsers(response.data.result);
            console.log(response.data.result);
            setIsLoad(true);
        });
    }, []);

    return (
        <div className='user-container'>
            {isLoad ? users.map((user, index) => {
                return (
                    <div className='user-block' key={index}>
                        <p className='user-name'>{user.firstName} {user.lastName}</p>
                        <p>{user.email}</p>
                    </div>
                );
            }) : <p>Загрузка...</p>}
        </div>
    );
};

export default AllUsers;


