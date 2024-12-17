import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Input } from '../components/Input';
import Loader from '../components/Loader'; 
import { auth } from '../lib/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import LoaderMain from '../components/LoaderMain';




const Login = () => {
    const [loading, setLoading] = useState();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    //check if user is already logged in
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            navigate('/main');
        }
    }, []);

    const handleLogin = async(e) => {

        
        e.preventDefault()
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User logged in:', user);
            navigate('/main');
        }
        catch (error) {
            setError(error.message);
            console.error('Login failed:', error);
        }
        finally {
            setLoading(false);
            
        }
    }

    return (
        <>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <LoaderMain />
                </div>
            )}
            <div className='flex flex-col items-center justify-center h-screen'>
                <div className="ml-1">
                    <img className='' src="./src/assets/logo.png" alt="" />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className='text-lg font-semibold mb-8 hover:text-yellow-600 hover:underline cursor-pointer'>Please Login to continue</p>
                    <Input onChange={(e) => setEmail(e.target.value)} type={'email'} placeholder={'Email'} />
                    <Input onChange={(e) => setPassword(e.target.value)} type={'password'} placeholder={'Password'} />
                    <p className='mt-4 hover:text-yellow-600'><span><Link to={'/signup'}>Wanna create an account?</Link></span></p>
                    {error && <p className='text-red-500'>{error}</p>}
                    <Button onClick={handleLogin} className='mt-10'>Login</Button>
                </div>
            </div>
        </>
    )
    
};

export default Login;