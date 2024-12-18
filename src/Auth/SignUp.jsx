import React, { useState } from 'react';
import Button from '../components/Button';
import { Input } from '../components/Input';
import LoaderMain from '../components/LoaderMain';
import { auth } from '../lib/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingTexts from '../components/FloatingTexts';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if(email && name && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/profileCreate');
      } catch (error) {
        setError(error.message.replace('Firebase: ', ''));
      }
    } else {
      setError('Please fill in all fields');
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#f0f0f0] flex flex-col items-center justify-center p-4"
    >
      <FloatingTexts />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <LoaderMain />
        </div>
      )}

      <div className="bg-white p-8 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <motion.img 
            src="/src/assets/logo.png" 
            alt="BroCode Logo"
            className="w-48 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <h1 className="text-2xl font-bold font-mono">Create Account</h1>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <Input 
            onChange={(e) => setName(e.target.value)} 
            type="text" 
            placeholder="Full Name"
            value={name}
          />
          <Input 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder="Email"
            value={email}
          />
          <Input 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder="Password"
            value={password}
          />

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded border border-red-200"
            >
              {error}
            </motion.p>
          )}

          <div className="flex flex-col items-center gap-4 mt-6">
            <Button onClick={handleSignUp} disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            
            <Link 
              to="/login"
              className="text-sm hover:text-yellow-600 transition-colors font-mono"
            >
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SignUp;