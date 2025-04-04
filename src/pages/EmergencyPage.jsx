import React, { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/Header";

const emergencyNumbers = [
    { name: "Полиция", number: "102" },
    { name: "Скорая помощь", number: "103" },
    { name: "Пожарная служба", number: "101" },
    { name: "Газовая служба", number: "104" },
    { name: "Служба спасения (ЧС)", number: "112" },
    { name: "Дорожно-патрульная служба (ДПС)", number: "+7 (727) 292 82 82" },
    { name: "Пожарная безопасность", number: "+7 (7172) 61 30 00" },
    { name: "Национальная гвардия РК", number: "+7 (7172) 71 75 11" },
    { name: "Служба охраны окружающей среды", number: "+7 (7172) 53 55 15" },
    { name: "Служба по борьбе с наркотиками", number: "+7 (7172) 71 83 53" },
    { name: "Экстренная психологическая помощь", number: "+7 (727) 375 03 40" },
    { name: "Горячая линия по правам ребенка", number: "+8 (800) 080 78 78" },
    { name: "Горячая линия для защиты прав потребителей", number: "+7 (7172) 74 26 87" },
    { name: "Горячая линия по вопросам насилия в семье", number: "+7 (7172) 29 13 33" },
    { name: "Психологическая помощь", number: "1400" },
    { name: "Служба доверия МВД", number: "+8 (800) 080 70 10" },
    { name: "Транспортная полиция", number: "+7 (727) 291 24 34" },
    { name: "Служба информации по правам человека", number: "+7 (7172) 71 90 03" },
];

function EmergencyNumbers() {
    const [combinedNumbers, setCombinedNumbers] = useState(emergencyNumbers);

    useEffect(() => {
        const userPhone = Cookies.get("id");
        const userPassword = Cookies.get("password");

        if (userPhone && userPassword) {
            Axios.post("http://89.46.33.136:7100/account/get/ephone", {
                id: userPhone,
                password: userPassword,
            })
                .then((response) => {
                    if (response.status === 200) {
                        const numbers = response.data.emergencyphones;
                        if (numbers && numbers.trim() !== "") {
                            const numberList = numbers.split(",").map((num, index) => ({
                                name: `Ваш номер ${index + 1}`,
                                number: num.trim(),
                            }));

                            // Добавляем номера с сервера в начало списка
                            setCombinedNumbers((prevNumbers) => [
                                ...numberList,
                                ...prevNumbers.filter(
                                    (num) => !numberList.some((newNum) => newNum.number === num.number)
                                ),
                            ]);
                        }
                    }
                })
                .catch((error) => {
                    console.error("Ошибка при получении экстренных номеров:", error);
                });
        }
    }, []);

    return (
        <>
            <Header />
            <div
                className="min-h-screen p-4 sm:p-6"
                style={{
                    background: "linear-gradient(to top left, #2abb, white)",
                }}
            >
                <h1 className="text-xl sm:text-2xl font-bold text-center text-[#2babb6] mb-4 sm:mb-6">Экстренные номера</h1>
                <div className="space-y-3 sm:space-y-4">
                    {combinedNumbers.map((service, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row justify-between items-center bg-white p-3 sm:p-4 rounded-lg shadow-md"
                        >
                            <span className="text-gray-800 font-semibold text-sm sm:text-base text-center sm:text-left">
                                {service.name}
                            </span>
                            <a
                                href={`tel:${service.number}`}
                                className="text-[#2babb6] font-semibold underline text-sm sm:text-base hover:text-[#2babb6] hover:opacity-75 mt-2 sm:mt-0"
                            >
                                {service.number}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default EmergencyNumbers;
