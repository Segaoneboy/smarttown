import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/ST.png";
import Cookies from "js-cookie";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const passwordCookie = Cookies.get("password");
        const idCookie = Cookies.get("id");
        let cookieExists = !!(passwordCookie && idCookie);
        setIsAuthenticated(cookieExists);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleAccountClick = () => {
        if (isAuthenticated) {
            navigate("/account");
        } else {
            navigate("/authorisation");
        }
    };



    return (
        <header className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <img src={logo} alt="SmartTown Logo" className="w-8 md:w-20"/>
                </Link>

                <nav className="hidden md:flex space-x-4">
                    <Link to="https://emichxam.github.io/petromap/index.html" className="transition duration-300 transform hover:scale-105 hover:bg-teal-600 rounded-lg px-4 py-2 font-bold">
                        Справочник услуг
                    </Link>
                    <Link to="/posterpage" className="transition duration-300 transform hover:scale-105 hover:bg-teal-600 rounded-lg px-4 py-2 font-bold">
                        Афиша
                    </Link>
                    <Link to="/opinionboard" className="transition duration-300 transform hover:scale-105 hover:bg-teal-600 rounded-lg px-4 py-2 font-bold">
                        Доска мнений
                    </Link>
                    <Link to="http://89.46.33.136:7150/" className="transition duration-300 transform hover:scale-105 hover:bg-teal-600 rounded-lg px-4 py-2 font-bold">
                        Уведомление о работах
                    </Link>
                    <Link to="/hamster" className="transition duration-300 transform hover:scale-105 hover:bg-teal-600 rounded-lg px-4 py-2 font-bold">
                        STCoin's
                    </Link>
                </nav>

                <div className="hidden md:block">
                    <button onClick={handleAccountClick} className="transition duration-300 transform hover:scale-105 hover:bg-teal-600 rounded-lg px-4 py-2 font-bold">
                        Личный кабинет
                    </button>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle menu">
                        {isOpen ? (
                            <span className="text-4xl text-white">&times;</span>
                        ) : (
                            <span className="text-2xl text-white">&#9776;</span>
                        )}
                    </button>
                </div>
            </div>

            {isOpen && (
                <nav className="md:hidden bg-gradient-to-r from-teal-400 to-cyan-500 p-2 rounded-lg">
                    <Link to="https://emichxam.github.io/petromap/index.html" className="text-white block p-2 transition duration-300 transform hover:scale-105 hover:bg-teal-600 rounded-lg">
                        Справочник услуг
                    </Link>
                    <Link to="/posterpage" className="text-white block p-2 transition duration-300 transform hover:scale-105 hover:bg-teal-600 rounded-lg">
                        Афиша
                    </Link>
                    <Link to="/opinionboard" className="text-white block p-2 transition duration-300 transform hover:scale-105 hover:bg-teal-600 rounded-lg">
                        Доска мнений
                    </Link>
                    <Link to="http://89.46.33.136:7150/" className="text-white block p-2 transition duration-300 transform hover:scale-105 hover:bg-teal-600 rounded-lg">
                        Уведомление о работах
                    </Link>
                    <Link to="/hamster" className="text-white block p-2 transition duration-300 transform hover:scale-105 hover:bg-teal-600 rounded-lg">
                        STCoin's
                    </Link>
                    <button onClick={handleAccountClick} className="text-white block p-2 transition duration-300 transform hover:scale-105 hover:bg-teal-600 rounded-lg">
                        Личный кабинет
                    </button>
                </nav>
            )}
        </header>
    );
};

export default Header;
