import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc, increment, setDoc, deleteDoc } from 'firebase/firestore';
import { auth } from '../lib/firebase.config';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data for generating random developers
const sampleData = {
  companies: ['Google', 'Microsoft', 'Apple', 'Meta', 'Amazon', 'Netflix', 'Twitter', 'Spotify', 'Airbnb', 'Uber', 'Independent'],
  skills: ['JavaScript', 'Python', 'Java', 'TypeScript', 'Go', 'Rust', 'C++', 'Ruby', 'Swift', 'Kotlin', 'PHP', 'Scala', 'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Node.js', 'Django', 'Flask', 'Spring', 'Docker', 'Kubernetes', 'AWS', 'Firebase'],
  firstNames: ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Sam', 'Jamie', 'Drew', 'Avery', 'Charlie', 'Skylar', 'Parker', 'Quinn', 'Blake'],
  lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'],
  jobTitles: ['Senior Software Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'Mobile Developer', 'Software Architect', 'Lead Developer', 'Principal Engineer']
};

// Generate initial local developers
const generateLocalDevelopers = () => {
  const developers = [];
  for (let i = 1; i <= 50; i++) {
    const firstName = sampleData.firstNames[Math.floor(Math.random() * sampleData.firstNames.length)];
    const lastName = sampleData.lastNames[Math.floor(Math.random() * sampleData.lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const company = sampleData.companies[Math.floor(Math.random() * sampleData.companies.length)];
    const jobTitle = sampleData.jobTitles[Math.floor(Math.random() * sampleData.jobTitles.length)];
    
    const numSkills = Math.floor(Math.random() * 4) + 3;
    const shuffledSkills = [...sampleData.skills].sort(() => 0.5 - Math.random());
    const skills = shuffledSkills.slice(0, numSkills);

    const repos = Math.floor(Math.random() * 50) + 10;
    const followers = Math.floor(Math.random() * 1000) + 100;

    developers.push({
      id: `local_${i}`,
      fullName,
      photoURL: null,
      jobTitle,
      company,
      experienceLevel: `${repos} public repos`,
      skills,
      votes: Math.floor(Math.random() * 50),
      followers,
      bio: `Passionate ${jobTitle} at ${company}`,
      source: 'local'
    });
  }
  return developers;
};

// Create initial local developers
const localDevelopers = generateLocalDevelopers();

const MainScreen = ({ user }) => {
  const [developers, setDevelopers] = useState({ left: null, right: null });
  const [loading, setLoading] = useState(true);
  const [voteCounts, setVoteCounts] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [allDevelopers, setAllDevelopers] = useState(localDevelopers);

  const initializeDatabaseDevelopers = async () => {
    try {
      const db = getFirestore();
      setStatusMessage('Initializing database developers...');

      // Generate and store 50 random developers
      const batch = [];
      for (let i = 1; i <= 50; i++) {
        const firstName = sampleData.firstNames[Math.floor(Math.random() * sampleData.firstNames.length)];
        const lastName = sampleData.lastNames[Math.floor(Math.random() * sampleData.lastNames.length)];
        const fullName = `${firstName} ${lastName}`;
        const company = sampleData.companies[Math.floor(Math.random() * sampleData.companies.length)];
        const jobTitle = sampleData.jobTitles[Math.floor(Math.random() * sampleData.jobTitles.length)];
        
        const numSkills = Math.floor(Math.random() * 4) + 3;
        const shuffledSkills = [...sampleData.skills].sort(() => 0.5 - Math.random());
        const skills = shuffledSkills.slice(0, numSkills);

        const repos = Math.floor(Math.random() * 50) + 10;
        const followers = Math.floor(Math.random() * 1000) + 100;

        const devData = {
          id: `db_${i}`,
          fullName,
          photoURL: null,
          jobTitle,
          company,
          experienceLevel: `${repos} public repos`,
          skills,
          votes: Math.floor(Math.random() * 50),
          followers,
          bio: `Passionate ${jobTitle} at ${company}`,
          source: 'database'
        };

        batch.push(setDoc(doc(db, 'userProfiles', devData.id), devData));
      }

      await Promise.all(batch);
      console.log('Successfully initialized database developers');
      return true;
    } catch (error) {
      console.error('Error initializing database developers:', error);
      return false;
    }
  };

  const getRandomDevelopers = async () => {
    try {
      setIsTransitioning(true);
      setStatusMessage('Finding awesome developers...');
      setLoading(true);
      
      let combinedDevelopers = [...allDevelopers];
      
      // Try to fetch from Firestore
      try {
        const db = getFirestore();
        const usersSnapshot = await getDocs(collection(db, 'userProfiles'));
        
        // If no developers in database, initialize them
        if (usersSnapshot.empty) {
          setStatusMessage('First time setup: Creating database developers...');
          await initializeDatabaseDevelopers();
          const newSnapshot = await getDocs(collection(db, 'userProfiles'));
          const dbDevelopers = newSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          combinedDevelopers = [...localDevelopers, ...dbDevelopers];
        } else {
          const dbDevelopers = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          combinedDevelopers = [...localDevelopers, ...dbDevelopers];
        }
      } catch (error) {
        console.log('Using local developers only:', error);
        combinedDevelopers = [...localDevelopers];
      }

      setAllDevelopers(combinedDevelopers);

      // Shuffle and pick 2 random developers
      const shuffledUsers = [...combinedDevelopers].sort(() => 0.5 - Math.random());
      const selectedUsers = shuffledUsers.slice(0, 2);
      
      setDevelopers({
        left: selectedUsers[0],
        right: selectedUsers[1]
      });
    } catch (error) {
      console.error('Error fetching developers:', error);
      setStatusMessage('Oops! Something went wrong. Trying again...');
      setTimeout(getRandomDevelopers, 2000);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setIsTransitioning(false);
        setStatusMessage('');
      }, 500);
    }
  };

  const handleVote = async (votedId, developerName) => {
    setIsTransitioning(true);
    setStatusMessage(`You voted for ${developerName}!`);
    
    // Find the voted developer
    const votedDev = allDevelopers.find(dev => dev.id === votedId);
    if (!votedDev) {
      console.error('Developer not found:', votedId);
      return;
    }

    try {
      const db = getFirestore();
      
      // If it's a local developer, push to Firestore first
      if (votedId.startsWith('local_')) {
        console.log('Converting local developer to database:', votedDev);
        
        // Remove fields that might cause issues
        const { id, source, ...cleanDev } = votedDev;
        
        // Create new Firestore document
        const newFirestoreId = `db_${Date.now()}`;
        const firestoreDev = {
          ...cleanDev,
          votes: (votedDev.votes || 0) + 1,
          source: 'database',
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
        
        console.log('Adding to Firestore with ID:', newFirestoreId, firestoreDev);
        
        // Add to Firestore
        const docRef = doc(db, 'userProfiles', newFirestoreId);
        await setDoc(docRef, firestoreDev);
        
        console.log('Successfully added to Firestore');
        
        // Create the complete updated developer object
        const updatedDev = {
          ...firestoreDev,
          id: newFirestoreId
        };
        
        // Update local state to replace the local developer with the Firestore version
        const updatedDevelopers = allDevelopers.map(dev => 
          dev.id === votedId ? updatedDev : dev
        );
        setAllDevelopers(updatedDevelopers);
        
        // Update displayed developers if necessary
        setDevelopers(prev => ({
          left: prev.left?.id === votedId ? updatedDev : prev.left,
          right: prev.right?.id === votedId ? updatedDev : prev.right
        }));
        
        console.log('Local state updated with Firestore developer');
      } else {
        // For database developers, just update the vote count
        console.log('Updating database developer vote:', votedId);
        
        const userDocRef = doc(db, 'userProfiles', votedId);
        await updateDoc(userDocRef, {
          votes: increment(1),
          lastUpdated: new Date().toISOString()
        });
        
        // Update local state
        const updatedDevelopers = allDevelopers.map(dev => {
          if (dev.id === votedId) {
            return { ...dev, votes: (dev.votes || 0) + 1 };
          }
          return dev;
        });
        setAllDevelopers(updatedDevelopers);
        
        console.log('Vote count updated for database developer');
      }
    } catch (error) {
      console.error('Error in handleVote:', error);
      // Update local state even if Firestore update fails
      const updatedDevelopers = allDevelopers.map(dev => {
        if (dev.id === votedId) {
          return { ...dev, votes: (dev.votes || 0) + 1 };
        }
        return dev;
      });
      setAllDevelopers(updatedDevelopers);
    }
    
    setTimeout(() => {
      setStatusMessage('Finding new challengers...');
      getRandomDevelopers();
    }, 1500);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const DeveloperCard = ({ developer, side, onVote }) => (
    <motion.div
      initial={{ x: side === 'left' ? -100 : 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: side === 'left' ? -100 : 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`bg-white p-8 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]`}
    >
      <motion.div 
        className="relative h-64 mb-6"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {developer.photoURL ? (
          <img
            src={developer.photoURL}
            alt={developer.fullName}
            className="w-full h-full object-cover border-4 border-black"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 border-4 border-black flex items-center justify-center">
            <span className="text-6xl font-bold text-white">
              {getInitials(developer.fullName)}
            </span>
          </div>
        )}
      </motion.div>
      <h2 className="text-2xl font-bold mb-4 font-mono">{developer.fullName}</h2>
      <p className="text-lg mb-4 font-mono">{developer.jobTitle} at {developer.company}</p>
      <p className="text-md mb-2 font-mono">Repos: {developer.experienceLevel}</p>
      <p className="text-md mb-6 font-mono">Followers: {developer.followers}</p>
      
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 font-mono">Top Languages:</h3>
        <div className="flex flex-wrap gap-2">
          {developer.skills.map((skill, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 bg-yellow-200 border-2 border-black text-sm font-bold rounded"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold font-mono">Votes: {developer.votes}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onVote(developer.id, developer.fullName)}
            disabled={isTransitioning}
            className={`px-6 py-3 bg-green-400 border-4 border-black rounded font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Vote
          </motion.button>
        </div>
        <a 
          href={developer.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center px-4 py-2 bg-gray-200 border-2 border-black rounded font-mono text-sm hover:bg-gray-300"
        >
          View GitHub Profile
        </a>
      </div>
    </motion.div>
  );

  const handleReset = async () => {
    setLoading(true);
    setStatusMessage('Resetting developer database...');
    
    try {
      // Clear existing database developers
      const db = getFirestore();
      const snapshot = await getDocs(collection(db, 'userProfiles'));
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      // Initialize new database developers
      await initializeDatabaseDevelopers();
    } catch (error) {
      console.error('Error resetting database:', error);
    }

    // Refresh developers
    await getRandomDevelopers();
  };

  useEffect(() => {
    getRandomDevelopers();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar user={user} />
        <div className="flex flex-col items-center justify-center h-screen font-mono text-xl gap-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-black border-t-transparent rounded-full"
          />
          <AnimatePresence mode="wait">
            <motion.p
              key={statusMessage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-xl font-bold"
            >
              {statusMessage}
            </motion.p>
          </AnimatePresence>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen bg-[#f0f0f0] pt-24 px-8">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold text-center mb-12 font-mono"
        >
          Who's the better dev?
        </motion.h1>
        
        <AnimatePresence mode="wait">
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-8"
            >
              <p className="text-xl font-bold font-mono bg-yellow-200 inline-block px-6 py-2 rounded-lg border-2 border-black">
                {statusMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatePresence mode="wait">
            {developers.left && (
              <DeveloperCard
                key={developers.left.id}
                developer={developers.left}
                side="left"
                onVote={handleVote}
              />
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {developers.right && (
              <DeveloperCard
                key={developers.right.id}
                developer={developers.right}
                side="right"
                onVote={handleVote}
              />
            )}
          </AnimatePresence>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={getRandomDevelopers}
          disabled={isTransitioning}
          className={`mx-auto mt-12 block px-8 py-4 bg-blue-400 border-4 border-black rounded-lg font-bold shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] font-mono ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Skip & Get New Developers
        </motion.button>

      </div>
    </>
  );
};

export default MainScreen;