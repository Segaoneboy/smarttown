import React from 'react';
import Header from "../components/Header";
import CookieConsent from "../components/CookieConsent";
import EmergencyBtn from "../components/EmergencyBtn";

const MainPage = () => {
    return (
        <>
            <Header/>
            <EmergencyBtn/>
            <CookieConsent />
        </>
    );
};

export default MainPage;
