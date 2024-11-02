import React from 'react';
import Header from "../components/Header";
import CookieConsent from "../components/CookieConsent";
import EmergencyBtn from "../components/EmergencyBtn";
import petro from "../assets/images/petro.jpg";

const MainPage = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center">
                <h1 className="text-2xl text-center my-8 text-stblue font-bold">Добро пожаловать в SmartTown!</h1>
                <img
                    src={petro}
                    alt="Petropavlovsk"
                    className="w-full max-w-md h-auto rounded-lg shadow-md"
                />
            </div>

            <EmergencyBtn />
            <CookieConsent />
        </>
    );
};

export default MainPage;
