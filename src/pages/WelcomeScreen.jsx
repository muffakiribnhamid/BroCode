import React, { useEffect } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext';
import { setLocal } from '../helpers/setLocal';
import MainScreen from './MainScreen';

const WelcomeScreen = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useUserContext();

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            setIsLoggedIn(true);
            navigate('/main');
        }
    }, []);
    
    const handleClick = () => {
        navigate('/login');
        setIsLoggedIn(true);
        setLocal('isLoggedIn', true);
    };

    return (
        isLoggedIn ? (
            <MainScreen/>
        ) : (
            <div className='flex flex-col items-center justify-center h-screen'>
                <img src="./src/assets/logo.png" alt="" />
                <h1 className='text-4xl font-bold mb-4 underline'>Welcome to BroCode</h1>
                <p className='text-lg  mt-10 mb-8'>The ultimate dev showdown—vote, rank, and crown the best coders in the world!</p>
                <Button onClick={handleClick}>Get Started</Button>
            </div>
        )
    );
}
export default WelcomeScreen