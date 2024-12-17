import {createContext, useContext, useState} from 'react';


const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [isOnBoardingCompleted, setIsOnBoardingCompleted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, isOnBoardingCompleted, setIsOnBoardingCompleted}}>
            {children}
        </UserContext.Provider>
    );
};


export const useUserContext = () => {
    return useContext(UserContext);
};