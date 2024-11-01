import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/ST.png";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the cookie exists (assuming it's named 'authToken')
        const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith('authToken='));
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
                    <button onClick={handleAccountClick} className="text-stblue hover:underline">
                        Личный кабинет
                    </button>
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
                    <button onClick={handleAccountClick} className="text-stblue block p-2">
                        Личный кабинет
                    </button>
                </nav>
            )}
        </header>
    );
};

export default Header;
