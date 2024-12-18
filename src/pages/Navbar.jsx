import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase.config';
import { motion } from 'framer-motion';

const Navbar = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isAnonymous');
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleProfile = () => {
        navigate('/profile');
    };

    const handleLeaderboard = () => {
        navigate('/leaderboard');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b-4 border-black z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <motion.div 
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img 
                            src="/src/assets/logo.png" 
                            alt="BroCode Logo" 
                            className="h-8 w-auto cursor-pointer"
                            onClick={() => navigate('/main')}
                        />
                    </motion.div>

                    <div className="flex items-center space-x-4">
                        {user && !user.isAnonymous && (
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                onClick={handleProfile}
                                className="px-4 py-2 text-sm font-medium text-black hover:text-yellow-600 focus:outline-none font-mono"
                            >
                                My Profile
                            </motion.button>
                        )}
                        
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate('/main')}
                            className="px-4 py-2 text-sm font-medium text-black hover:text-yellow-600 focus:outline-none font-mono"
                        >
                            Voting Arena
                        </motion.button>
                        
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            onClick={handleLeaderboard}
                            className="px-4 py-2 text-sm font-medium text-black hover:text-yellow-600 focus:outline-none font-mono"
                        >
                            Leaderboard
                        </motion.button>

                        {!user ? (
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 text-sm font-medium bg-yellow-400 text-black border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-mono"
                            >
                                Sign In
                            </motion.button>
                        ) : (
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium bg-red-400 text-black border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-mono"
                            >
                                {user.isAnonymous ? 'Sign In' : 'Logout'}
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;