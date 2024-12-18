import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

const Leaderboard = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDev, setSelectedDev] = useState(null);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const db = getFirestore();
        const q = query(
          collection(db, 'userProfiles'),
          orderBy('votes', 'desc'),
          limit(50)
        );
        const querySnapshot = await getDocs(q);
        const devList = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          rank: index + 1,
          ...doc.data()
        }));
        setDevelopers(devList);
      } catch (error) {
        console.error('Error fetching developers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-yellow-400';
      case 2: return 'bg-gray-300';
      case 3: return 'bg-orange-400';
      default: return 'bg-white';
    }
  };

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-black border-t-transparent rounded-full"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0f0f0] pt-24 px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-center mb-12 font-mono">
            🏆 Developer Leaderboard
          </h1>

          <div className="grid gap-6">
            {developers.map((dev) => (
              <motion.div
                key={dev.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                className={`${getRankColor(dev.rank)} p-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]`}
                onClick={() => setSelectedDev(selectedDev?.id === dev.id ? null : dev)}
              >
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="text-4xl font-bold font-mono w-20 h-20 bg-white border-4 border-black rounded-lg flex items-center justify-center">
                    {getRankEmoji(dev.rank)}
                    <span className="ml-2">{dev.rank}</span>
                  </div>

                  {/* Profile Image */}
                  <div className="w-16 h-16 relative">
                    {dev.photoURL ? (
                      <img
                        src={dev.photoURL}
                        alt={dev.fullName}
                        className="w-full h-full object-cover border-2 border-black rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-purple-200 border-2 border-black rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {dev.fullName?.charAt(0).toUpperCase() || '?'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold font-mono">{dev.fullName}</h2>
                    <p className="font-mono text-sm">{dev.jobTitle} at {dev.company}</p>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="bg-white px-4 py-2 border-2 border-black rounded-lg">
                      <p className="font-mono font-bold">🗳️ {dev.votes || 0} votes</p>
                    </div>
                  </div>
                </div>

                {/* Expanded Info */}
                <AnimatePresence>
                  {selectedDev?.id === dev.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t-2 border-black"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 border-2 border-black rounded-lg">
                          <h3 className="font-mono font-bold mb-2">Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {dev.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-yellow-200 border-2 border-black rounded text-sm font-mono"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white p-4 border-2 border-black rounded-lg">
                          <h3 className="font-mono font-bold mb-2">Experience</h3>
                          <p className="font-mono">⚡ {dev.experienceLevel}</p>
                          <p className="font-mono">👥 Age: {dev.age}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {developers.length === 0 && (
            <div className="text-center p-8 bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xl font-mono">No developers found! Start voting to see the leaderboard.</p>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Leaderboard;