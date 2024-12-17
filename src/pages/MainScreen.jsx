import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { auth } from '../lib/firebase.config';

const MainScreen = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const db = getFirestore();
        const profilesCollection = collection(db, 'userProfiles');
        const profilesSnapshot = await getDocs(profilesCollection);
        const profilesList = profilesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProfiles(profilesList);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading profiles...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Developer Profiles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                {profile.photoURL ? (
                  <img
                    src={profile.photoURL}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl text-gray-400">
                      {profile.fullName?.charAt(0).toUpperCase() || '?'}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{profile.fullName}</h2>
                <p className="text-gray-600 mb-2">{profile.jobTitle} at {profile.company}</p>
                <p className="text-gray-500 text-sm mb-4">Experience: {profile.experienceLevel}</p>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Age: {profile.age}</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainScreen;