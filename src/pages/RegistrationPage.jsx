import React, { useState } from "react";
import axios from "axios";

function RegistrationPage() {
    const [formData, setFormData] = useState({
        username: "",
        id: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://your-api-url.com/register", formData);
            console.log("Регистрация успешна:", response.data);
            // Можно добавить логику для перенаправления или уведомления
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
            // Можно также добавить логику для отображения ошибки пользователю
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Регистрация</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Имя пользователя</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
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
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationPage;