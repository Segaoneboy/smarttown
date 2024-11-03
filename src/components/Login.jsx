import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link для навигации
import classNames from 'classnames';


const Login = () => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isNumberFocused, setIsNumberFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNumberFocus = () => {
    setIsNumberFocused(true);
  };

  const handleNumberBlur = () => {
    if (number === '') {
      setIsNumberFocused(false);
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    if (password === '') {
      setIsPasswordFocused(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-96 relative">
        <h2 className="text-center text-2xl mb-4">Вход</h2>

        <div className="relative mb-6">
          <label
            className={classNames(
              'absolute left-2 transition-all duration-200',
              {
                'top-[-25px] text-teal-500': isNumberFocused || number,
                'top-2 text-gray-500': !(isNumberFocused || number),
              }
            )}
          >
            Номер
          </label>
          <input
            type="text"
            value={number}
            onChange={handleNumberChange}
            onFocus={handleNumberFocus}
            onBlur={handleNumberBlur}
            className="border rounded-lg py-2 px-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="relative mb-6">
          <label
            className={classNames(
              'absolute left-2 transition-all duration-200',
              {
                'top-[-25px] text-teal-500': isPasswordFocused || password,
                'top-2 text-gray-500': !(isPasswordFocused || password),
              }
            )}
          >
            Пароль
          </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            className="border rounded-lg py-2 px-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <button
          className="w-full bg-teal-500 text-white rounded-lg py-2 hover:bg-teal-600 transition duration-200"
        >
          Войти
        </button>

        <div className="text-center mt-4">
          <p>
            Еще не зарегистрировались?{' '}
            <Link to="/registration" className="text-teal-500 hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
