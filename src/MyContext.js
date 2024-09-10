import React, { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        // Lấy dữ liệu từ localStorage khi ứng dụng khởi động
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : { username: '', password: '' };
    });

    useEffect(() => {
        // Lưu dữ liệu vào localStorage khi currentUser thay đổi
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <MyContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;
