import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Input } from '../components/Input';
import LoaderMain from '../components/LoaderMain';
import { auth } from '../lib/firebase.config';
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingTexts from '../components/FloatingTexts';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn');
        if (storedLoginStatus === 'true') {
            navigate('/main');
        }
    }, []);

    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/main');
        } catch (error) {
            setError(error.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    }

    const handleAnonymousLogin = async () => {
        setLoading(true);
        setError('');

        try {
            await signInAnonymously(auth);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAnonymous', 'true');
            navigate('/main');
        } catch (error) {
            console.error('Anonymous login error:', error);
            if (error.code === 'auth/operation-not-allowed') {
                setError('Anonymous login is not enabled. Please sign in with email or create an account.');
            } else {
                setError(error.message.replace('Firebase: ', ''));
            }
        } finally {
            setLoading(false);
        }
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
                    <h1 className="text-2xl font-bold font-mono">Welcome Back!</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
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
                        <Button onClick={handleLogin} disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>

                        <div className="flex items-center gap-4 w-full my-4">
                            <div className="flex-1 h-0.5 bg-gray-200"></div>
                            <span className="text-gray-400 text-sm font-mono">OR</span>
                            <div className="flex-1 h-0.5 bg-gray-200"></div>
                        </div>
                        
                        <Button 
                            onClick={handleAnonymousLogin} 
                            variant="secondary" 
                            disabled={loading}
                            className="w-full bg-gray-100 hover:bg-gray-200"
                        >
                            Continue as Guest
                        </Button>
                        
                        <Link 
                            to="/signup"
                            className="text-sm hover:text-yellow-600 transition-colors font-mono"
                        >
                            Don't have an account? Sign up here
                        </Link>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default Login;