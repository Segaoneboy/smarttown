import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from "../components/Header";
import EmergencyBtn from "../components/EmergencyBtn";

const features = [
    {
        title: "Городская афиша и события",
        description: "Узнай о мероприятиях в твоем городе, оставляй отзывы и делись афишами."
    },
    {
        title: "Уведомления о городских работах",
        description: "Будь в курсе текущих работ и ремонтов в городе через уведомления и карту."
    },
    {
        title: "Справочник услуг",
        description: "Быстрый доступ к ключевым городским службам с возможностью связи и поиска на карте."
    },
    {
        title: "Интерактивный сбор мнений",
        description: "Делись отзывами и предложениями по улучшению города, голосуй и обсуждай идеи."
    },
    {
        title: "Экстренная кнопка",
        description: "Быстрый вызов экстренных служб с отправкой твоей геолокации."
    },
    {
        title: "QR-коды",
        description: "Сканируй QR-коды для получения информации о городских услугах и транспорте."
    },
    {
        title: "Геймификация",
        description: "Играй в нашу игру, пиши коментарии и получай коины"
    },
];

const Home = () => {
    const [visibleFeatures, setVisibleFeatures] = useState(Array(features.length).fill(false));

    useEffect(() => {
        const handleScroll = () => {
            const newVisibleFeatures = features.map((_, index) => {
                const element = document.getElementById(`feature-${index}`);
                return element && element.getBoundingClientRect().top < window.innerHeight - 150;
            });
            setVisibleFeatures(newVisibleFeatures);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-stblue to-white">
            <Header/>
            <motion.div
                className="relative inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            />

            <div className="flex flex-col items-center justify-center h-[90vh] relative">
                <motion.div
                    className="text-white text-5xl font-bold text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    Добро пожаловать в Smart Town!
                </motion.div>
            </div>

            <div className="flex flex-col items-center p-8 space-y-12 flex-grow">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        id={`feature-${index}`}
                        className={`flex flex-col justify-start items-start bg-white rounded-lg shadow-lg p-5 w-full max-w-3xl`}
                        initial={{ opacity: 0, translateY: 20 }}
                        animate={{
                            opacity: visibleFeatures[index] ? 1 : 0,
                            translateY: visibleFeatures[index] ? 0 : 20
                        }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: visibleFeatures[index] ? index * 0.1 : 0
                        }}
                    >
                        <h3 className="text-2xl font-semibold text-[#2babb6] w-full text-left">{feature.title}</h3>
                        <p className="text-lg w-full text-left">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
            <EmergencyBtn/>
            <div className="h-[5vh]" />
        </div>
    );
};

export default Home;
