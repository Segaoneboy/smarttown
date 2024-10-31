import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/images/ST.png";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("Личный кабинет");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const userPhoneCookie = document.cookie.split('; ').find(row => row.startsWith('userPhone='));
        const userPasswordCookie = document.cookie.split('; ').find(row => row.startsWith('userPassword='));

        // Проверяем, есть ли куки
        if (userPhoneCookie && userPasswordCookie) {
            const phone = userPhoneCookie.split('=')[1];
            const password = userPasswordCookie.split('=')[1];

            setIsAuthenticated(true); // Пользователь авторизован

            // Запрос имени пользователя
            axios.post('http://89.46.33.136:7100/account/get/name', {
                id: phone,
                password: password
            })
                .then(response => {
                    console.log("Ответ от API:", response.data);
                    // Проверяем наличие 'username' в ответе
                    if (response.data && response.data.username) {
                        setUsername(response.data.username);
                    } else {
                        console.log("Имя пользователя не найдено в ответе:", response.data);
                        setUsername("Личный кабинет"); // Возвращаем к стандартному значению
                    }
                })
                .catch(error => {
                    console.error("Ошибка при получении имени пользователя:", error);
                    setUsername("Личный кабинет"); // Возвращаем к стандартному значению в случае ошибки
                });
        } else {
            console.log("Куки не найдены, пользователь не авторизован.");
            setIsAuthenticated(false); // Обновляем состояние аутентификации
        }
    }, []);

    return (
        <header className="text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <img src={logo} alt="SmartTown Logo" className="w-8 md:w-20" />

                <nav className="hidden md:flex space-x-4">
                    <Link to="#home" className="text-stblue hover:underline">Справочник услуг</Link>
                    <Link to="/createpost" className="text-stblue hover:underline">Афиша</Link>
                    <Link to="/opinionboard" className="text-stblue hover:underline">Доска мнений</Link>
                </nav>

                <div className="hidden md:block">
                    <Link to={isAuthenticated ? "/account" : "/authorisation"} className="text-stblue hover:underline">
                        {username}
                    </Link>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle menu">
                        {isOpen ? (
                            <span className="text-4xl text-stblue">&times;</span>
                        ) : (
                            <span className="text-2xl text-stblue">&#9776;</span>
                        )}
                    </button>
                </div>
            </div>

            {isOpen && (
                <nav className="md:hidden top-1">
                    <Link to="#home" className="text-stblue block p-2">Справочник услуг</Link>
                    <Link to="/createpost" className="text-stblue block p-2">Афиша</Link>
                    <Link to="/opinionboard" className="text-stblue block p-2">Доска мнений</Link>
                    <Link to={isAuthenticated ? "/account" : "/authorisation"} className="text-stblue block p-2">
                        {username}
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
