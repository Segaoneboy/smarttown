import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Логотип */}
                <h1 className="text-xl font-bold">Мой Сайт</h1>

                {/* Обычное меню (скрывается на малых экранах) */}
                <nav className="hidden md:flex space-x-4">
                    <Link to="#home" className="hover:underline">Справочник услуг</Link>
                    <Link to="/createpost" className="hover:underline">Афиша</Link>
                    <Link to="#services" className="hover:underline">Доска мнений</Link>
                    <Link to="/authorisation" className="hover:underline">Личный кабинет</Link>
                </nav>

                {/* Бургер-иконка (показывается на малых экранах) */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle menu">
                        {isOpen ? (
                            <span className="text-2xl">&times;</span> // Иконка закрытия (крестик)
                        ) : (
                            <span className="text-2xl">&#9776;</span> // Бургер-иконка (три полоски)
                        )}
                    </button>
                </div>
            </div>

            {/* Выпадающее меню (показывается на малых экранах) */}
            {isOpen && (
                <nav className="md:hidden bg-blue-600">
                    <Link to="#home" className="block p-2 hover:bg-blue-700">Справочник услуг</Link>
                    <Link to="/createpost" className="block p-2 hover:bg-blue-700">Афиша</Link>
                    <Link to="#services" className="block p-2 hover:bg-blue-700">Доска мнений</Link>
                    <Link to="/authorisation" className="block p-2 hover:bg-blue-700">Личный кабинет</Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
