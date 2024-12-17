import React, { useState } from 'react'
import { Input } from '../components/Input'
import Button from '../components/Button'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase.config';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async(e) => {

    
    e.preventDefault()
    setLoading(true);
    // Handle sign-up logic here
    if(email && name && password){
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User signed up:', user);
            navigate('/profileCreate');
        }
        catch (error) {
            setError(error.message);
            console.error('Sign-up failed:', error);
        }
        finally {
            setLoading(false);
            
        }
    }
  };



  return (
    <div className='flex flex-col items-center justify-center h-screen'>
    <div className="ml-1">
        <img className='' src="./src/assets/logo.png" alt="" />
    </div>
    <div className="flex flex-col items-center justify-center">
        <p className='text-lg font-semibold mb-8 hover:text-yellow-600 hover:underline cursor-pointer'>Hey there! Sign up to continue</p>

        <Input onChange={(e) => setName(e.target.value)} type={'text'} placeholder={'Name'} />
        <Input onChange={(e) => setEmail(e.target.value)} type={'email'} placeholder={'Email'} />
        <Input onChange={(e) => setPassword(e.target.value)} type={'password'} placeholder={'set a password'} />
        <p className='mt-4 hover:text-yellow-600'><span><a href="#">Already have an account?</a></span></p>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <Button onClick={handleSignUp} className='mt-10'>Sign Up</Button>
    </div>
</div>
  )
}

export default SignUp