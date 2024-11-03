import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-[800px] h-[500px] overflow-hidden rounded-3xl shadow-lg bg-white"> 
        
        
        <div className="w-1/2 h-full flex flex-col justify-center items-center bg-white px-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Регистрация</h2>
          <form className="w-full space-y-4">
            <InputField label="Никнейм" type="text" />
            <InputField label="Введите номер" type="text" />
            <InputField label="Пароль" type="password" />
            <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition">
              Зарегистрироваться
            </button>
          </form>
        </div>

        <div className="w-1/2 h-full flex flex-col justify-center items-center bg-[#35b1a6] text-white px-10 rounded-l-[120px]">
          <h2 className="text-3xl font-bold mb-4">Привет, друг!</h2>
          <p className="mb-6 text-lg">Чтобы продолжить, войдите в свой аккаунт.</p>
          <button
            className="bg-white text-teal-500 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition"
            onClick={() => navigate('/login')}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, type }) {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');
  
    return (
      <div className="relative w-full mb-4"> 
        <label
          className={`absolute left-3 transition-all duration-200 ${isFocused || value ? '-top-5 text-teal-500' : 'top-2 text-gray-500'}`} // Поднятие подсказки выше
        >
          {label}
        </label>
        <input
          type={type}
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (!value) {
              setIsFocused(false);
            }
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  }
