import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RegistrationPage() {
    const [formData, setFormData] = useState({
        name: "",
        id: "",
        password: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("Текущее состояние formData:", { ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на формат номера телефона
        if (!formData.id.startsWith("+7")) {
            setError("Номер телефона должен начинаться с +7");
            console.log("Ошибка: Номер телефона не начинается с +7");
            return;
        }

        // Очистка сообщения об ошибке, если номер корректен
        setError("");

        // Логирование данных перед отправкой
        console.log("Данные для отправки:", formData);

        try {
            const response = await axios.post("http://89.46.33.136:7100/auth/registration", formData, {});
            console.log("Регистрация успешна:", response.data);

            // После успешной регистрации перенаправляем на главную страницу
            navigate("/");
        } catch (error) {
            // Обработка ошибок и отображение сообщения
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Ошибка при регистрации. Пожалуйста, попробуйте еще раз.");
            } else {
                setError("Неизвестная ошибка. Пожалуйста, проверьте ваше соединение.");
            }
            console.error("Ошибка при регистрации:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md p-8 space-y-4 bg-white border border-stblue rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-stblue">Регистрация</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Имя пользователя</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-1 focus:ring-stblue focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Телефон</label>
                        <input
                            type="tel"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            required
                            placeholder="+75555555555"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-1 focus:ring-stblue focus:outline-none"
                        />
                        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Пароль</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-1 focus:ring-stblue focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-[#2babb6] rounded-md hover:bg-stblue focus:outline-none"
                    >
                        Зарегистрироваться
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-[#2babb6]">
                    У вас уже есть аккаунт? <Link to="/authorisation" className="text-stblue underline">Войти</Link>
                </p>
            </div>
        </div>
    );
}

export default RegistrationPage;
