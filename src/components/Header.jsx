import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/ST.png";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <img src={logo} alt="SmartTown Logo" className="w-8 md:w-20"/>
                </Link>

                <nav className="hidden md:flex space-x-4">
                    <Link to="https://emichxam.github.io/petromap/index.html" className="text-stblue hover:underline">Справочник услуг</Link>
                    <Link to="/posterpage" className="text-stblue hover:underline">Афиша</Link>
                    <Link to="/opinionboard" className="text-stblue hover:underline">Доска мнений</Link>
                    <Link to="/opinionboard" className="text-stblue hover:underline">Уведомление о работах</Link>
                </nav>

                <div className="hidden md:block">
                    <Link to="/account" className="text-stblue hover:underline">
                        Личный кабинет
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
                    <Link to="https://emichxam.github.io/petromap/index.html" className="text-stblue block p-2">Справочник услуг</Link>
                    <Link to="/posterpage" className="text-stblue block p-2">Афиша</Link>
                    <Link to="/opinionboard" className="text-stblue block p-2">Доска мнений</Link>
                    <Link to="/opinionboard" className="text-stblue hover:underline">Уведомление о работах</Link>
                    <Link to="/authorisation" className="text-stblue block p-2">
                        Личный кабинет
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
