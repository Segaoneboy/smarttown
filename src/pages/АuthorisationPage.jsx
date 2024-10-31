import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function AuthorisationPage() {
    const [formData, setFormData] = useState({
        id: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка номера телефона
        if (!formData.id.startsWith("+7")) {
            setError("Номер телефона должен начинаться с +7");
            return;
        }
        setError("");

        try {
            // GET-запрос с передачей параметров
            const response = await axios.post("http://89.46.33.136:7100/auth/login", formData)

            console.log("Авторизация успешна:", response.data);
            // Логика для перенаправления или уведомления
        } catch (error) {
            console.error("Ошибка при авторизации:", error);
            // Логика для отображения ошибки пользователю
            setError("Ошибка при авторизации. Пожалуйста, проверьте данные.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Вход в аккаунт</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Номер телефона</label>
                        <input
                            type="tel"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
                    >
                        Войти
                    </button>
                </form>
                <Link to="/registration" className=''>Еще не зарегестрированы? Зарегестрируйтесь здесь!</Link>
            </div>
        </div>
    );
}

export default AuthorisationPage;
