import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../components/Header'; // Импортируем шапку

const Account = () => {
    const [statusMessage, setStatusMessage] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userPhone = Cookies.get("userPhone");
        const userPassword = Cookies.get("userPassword");

        if (!userPhone || !userPassword) {
            setStatusMessage('Ошибка: не удалось получить данные пользователя из куки. Вы не авторизованы.');
            return; // Завершаем выполнение, если нет куков
        }

        const fetchUserName = async () => {
            try {
                const response = await axios.post('http://89.46.33.136:7100/account/get/name', {
                    id: userPhone,
                    password: userPassword,
                });

                // Проверяем, есть ли имя пользователя в ответе
                if (response.data && response.data.name) {
                    setUserName(response.data.name);
                } else {
                    setUserName(''); // Сбрасываем имя, если оно undefined
                }
            } catch (error) {
                setStatusMessage('Ошибка при получении данных пользователя.');
                console.error(error);
            }
        };

        fetchUserName(); // Получаем имя пользователя при загрузке компонента
    }, []);

    return (
        <div>
            <Header /> {/* Включаем шапку */}
            <div className="p-4 bg-white min-h-screen flex flex-col items-center">
                <h1 className="text-2xl text-stblue font-bold mb-4 text-center">Личный кабинет</h1>

                {statusMessage && (
                    <p className="text-gray-600 text-center">
                        {statusMessage}
                    </p>
                )}

                {/* Отображаем имя пользователя, если оно определено */}
                {userName && (
                    <p className="text-gray-800 text-center">
                        Добро пожаловать, {userName}!
                    </p>
                )}
            </div>
        </div>
    );
};

export default Account;
