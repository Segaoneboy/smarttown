import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const useCookieCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkCookies = () => {
            const userPhone = Cookies.get('userPhone');
            const userPassword = Cookies.get('userPassword');

            if (!userPhone || !userPassword) {
                navigate('/authorisation');
            }
        };

        checkCookies();

        const interval = setInterval(checkCookies, 300000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(interval);
    }, [navigate]);
};

export default useCookieCheck;
