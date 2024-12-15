import React, { useState } from 'react';
import Button from '../components/Button';
import { Input } from '../components/Input';
import Loader from '../components/Loader'; // Ensure Loader is imported

const Login = () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 2000);

    return (
        loading ? (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        ) : (
            <div className='flex flex-col items-center justify-center h-screen'>
                <div className="ml-1">
                    <img className='' src="./src/assets/logo.png" alt="" />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className='text-lg font-semibold mb-8 hover:text-yellow-600 hover:underline cursor-pointer'>Please Login to continue</p>
                    <Input type={'email'} placeholder={'Email'} />
                    <Input type={'password'} placeholder={'Password'} />
                    <p className='mt-4 hover:text-yellow-600'><span><a href="#">Already have an account?</a></span></p>
                    <Button className='mt-10'>Login</Button>
                </div>
            </div>
        )
    );
};

export default Login;