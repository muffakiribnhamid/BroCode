import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../lib/firebase.config';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'userProfiles', currentUser.uid));
          if (userDoc.exists()) {
            setUserProfile({
              id: userDoc.id,
              ...userDoc.data()
            });
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

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

  if (!userProfile) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xl font-mono">Profile not found!</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0f0f0] pt-24 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-8 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <motion.div 
                className="w-full md:w-1/3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {userProfile.photoURL ? (
                  <img
                    src={userProfile.photoURL}
                    alt={userProfile.fullName}
                    className="w-full h-64 object-cover border-4 border-black rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-yellow-200 border-4 border-black rounded-lg flex items-center justify-center">
                    <span className="text-6xl font-bold">
                      {userProfile.fullName?.charAt(0).toUpperCase() || '?'}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Profile Info */}
              <div className="w-full md:w-2/3">
                <h1 className="text-4xl font-bold font-mono mb-4">{userProfile.fullName}</h1>
                <div className="space-y-4">
                  <div className="bg-yellow-200 p-4 border-2 border-black rounded-lg">
                    <h2 className="text-xl font-bold font-mono mb-2">Professional Info</h2>
                    <p className="font-mono">🏢 {userProfile.jobTitle} at {userProfile.company}</p>
                    <p className="font-mono">⚡ {userProfile.experienceLevel} experience</p>
                  </div>

                  <motion.div 
                    className="bg-blue-200 p-4 border-2 border-black rounded-lg"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h2 className="text-xl font-bold font-mono mb-2">Stats</h2>
                    <p className="font-mono">🏆 Total Votes: {userProfile.votes || 0}</p>
                    <p className="font-mono">👥 Age: {userProfile.age}</p>
                  </motion.div>

                  <div className="bg-green-200 p-4 border-2 border-black rounded-lg">
                    <h2 className="text-xl font-bold font-mono mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-white border-2 border-black text-sm font-bold rounded"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <motion.div 
                    className="bg-purple-200 p-4 border-2 border-black rounded-lg"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h2 className="text-xl font-bold font-mono mb-2">Contact</h2>
                    <p className="font-mono">📧 {userProfile.email}</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Achievement Banner */}
            <motion.div 
              className="mt-8 bg-red-200 p-4 border-2 border-black rounded-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <h2 className="text-xl font-bold font-mono text-center">
                🌟 Achievement Unlocked: {userProfile.votes > 50 ? 'Popular Developer' : 'Rising Star'} 🌟
              </h2>
            </motion.div>
          </motion.div>

          {/* Edit Profile Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto mt-8 block px-8 py-4 bg-blue-400 border-4 border-black rounded-lg font-bold shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] font-mono"
          >
            Edit Profile
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Profile;