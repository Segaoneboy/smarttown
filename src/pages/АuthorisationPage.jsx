import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

function LoginForm() {
    const [formData, setFormData] = useState({ id: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Форма отправлена"); // Проверка: виден ли этот вывод

        try {
            const response = await axios.post('http://89.46.33.136:7100/auth/login', formData);
            console.log("Ответ от сервера:", response); // Проверка: вывод ответа от сервера

            // Проверяем успешные коды ответа
            if ([200, 201, 202].includes(response.status)) {
                // Устанавливаем куки на 10 минут
                Cookies.set('phone', formData.id, { expires: 1 / 144 }); // 10 минут как дробь дня
                Cookies.set('password', formData.password, { expires: 1 / 144 });

                console.log("Куки установлены"); // Проверка: куки установлены
                navigate('/account'); // Перенаправление на /account при успешном входе
            } else {
                setError('Ошибка при авторизации. Проверьте данные и попробуйте снова.');
            }
        } catch (err) {
            console.error("Ошибка при запросе:", err); // Проверка: вывод ошибки в консоль
            setError('Неправильный номер телефона или пароль');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 space-y-4 bg-white border rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-[#2babb6]">Вход в аккаунт</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Номер телефона</label>
                        <input
                            type="tel"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-1 focus:ring-[#2babb6] focus:outline-none"
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
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-1 focus:ring-[#2babb6] focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-[#2babb6] rounded-md hover:bg-[#27a49f] focus:outline-none"
                    >
                        Войти
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600">
                    Нет аккаунта? <Link to="/registration" className="text-[#2babb6]">Зарегистрируйтесь</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
