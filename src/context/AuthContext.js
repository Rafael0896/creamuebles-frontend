import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Aquí guardarías el usuario y su token después del login
    const [user, setUser] = useState(null); 
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Función que se llamaría al hacer login exitoso
    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('token', userToken); // Guardamos el token para persistencia
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const value = { user, token, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};