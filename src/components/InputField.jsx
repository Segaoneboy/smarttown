// InputField.jsx

import React, { useState } from "react";

function InputField({ label, type, name, value, onChange, placeholder }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative w-full mb-4">
            <label
                className={`absolute left-3 transition-all duration-200 ${isFocused || value ? '-top-5 text-[#2babb6]' : 'top-2 text-gray-500'}`}
            >
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2babb6]"
                onFocus={() => setIsFocused(true)}
                onBlur={() => !value && setIsFocused(false)}
            />
        </div>
    );
}

export default InputField;
