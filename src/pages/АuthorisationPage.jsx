import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../assets/images/ST.png';
import InputField from '../components/InputField';

function AuthorisationPage() {
    const [formData, setFormData] = useState({
        id: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на формат номера телефона
        if (!formData.id.startsWith("+7")) {
            setError("Номер телефона должен начинаться с +7");
            return;
        }
        setError("");

        try {
            // Запрос на авторизацию
            const response = await axios.post("http://89.46.33.136:7100/auth/login", formData);
            console.log("Авторизация успешна:", response.data);

            // Сохранение данных в cookies
            Cookies.set("id", formData.id, { expires: 1 });
            Cookies.set("password", formData.password, { expires: 1 });

            navigate("/account");
        } catch (error) {
            console.error("Ошибка при авторизации:", error);
            setError("Ошибка при авторизации. Пожалуйста, проверьте данные.");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-white to-[#2babb6] px-4">
            <div className="flex flex-col w-full max-w-4xl overflow-hidden rounded-3xl shadow-lg bg-white">
                <div className="flex flex-col sm:flex-row w-full h-auto">
                    <div className="w-full sm:w-1/2 flex flex-col justify-center items-center bg-white px-8 py-8">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Вход</h2>
                        <form onSubmit={handleSubmit} className="w-full space-y-4">
                            <InputField
                                label="Номер телефона"
                                type="tel"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                                isFocused={formData.id !== ""}
                            />
                            <InputField
                                label="Пароль"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                isFocused={formData.password !== ""}
                            />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <button className="w-full bg-[#2babb6] text-white py-2 rounded-lg hover:bg-teal-600 transition" type="submit">
                                Войти
                            </button>
                        </form>
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-col justify-center items-center bg-[#2babb6] text-white px-8 py-8 sm:rounded-l-[120px]">
                        <h2 className="text-3xl font-bold mb-4 text-center">Привет, друг!</h2>
                        <p className="mb-6 text-lg text-center">Чтобы создать аккаунт, зарегистрируйтесь!</p>
                        <button
                            className="bg-white text-[#2babb6] font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition"
                            onClick={() => navigate('/registration')}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthorisationPage;
