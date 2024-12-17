import React, { useState } from 'react';
import { Input } from '../components/Input';
import Button from '../components/Button';
import '../styles/ProfileCreate.css';
import { auth } from '../lib/firebase.config';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ProfileCreate = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        company: '',
        jobTitle: '',
        skills: [],
        otherSkills: '',
        experienceLevel: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Convert image to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Store base64 string
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillChange = (skill) => {
        setFormData(prev => {
            const updatedSkills = prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill];
            return {
                ...prev,
                skills: updatedSkills
            };
        });
    };

    const handleSubmit = async () => {
        try {
            // Validate required fields
            if (!formData.fullName || !formData.age || !formData.company || !formData.jobTitle || !formData.experienceLevel) {
                alert('Please fill in all required fields');
                return;
            }

            setLoading(true);
            const user = auth.currentUser;
            if (!user) throw new Error('No authenticated user found');

            // Clean up the data by removing empty fields
            const cleanedFormData = Object.fromEntries(
                Object.entries(formData).filter(([_, value]) => 
                    value !== '' && value !== null && value !== undefined
                )
            );

            // Prepare profile data with base64 image
            const profileData = {
                ...cleanedFormData,
                userId: user.uid,
                email: user.email,
                photoURL: image || null, // if no image, set to null
                skills: [
                    ...formData.skills,
                    ...(formData.otherSkills ? formData.otherSkills.split(',').map(skill => skill.trim()).filter(Boolean) : [])
                ],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Save to Firestore
            const db = getFirestore();
            await setDoc(doc(db, 'userProfiles', user.uid), profileData);

            alert('Profile created successfully!');
            // Navigate to dashboard
            navigate('/main');
        } catch (error) {
            console.error('Error creating profile:', error);
            alert('Failed to create profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='profile-container'>
            <div className="profile-content">
                {/* Top Section with Image and About */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center">
                        <div className="profile-image-upload">
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-gray-400 text-sm">No image</span>
                                </div>
                            )}
                        </div>
                        <label className="cursor-pointer bg-blue-500 text-white text-sm px-4 py-2 rounded-full mt-3 hover:bg-blue-600 shadow-sm">
                            Upload Photo
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>

                    {/* About Section */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className='text-2xl md:text-3xl font-bold'>Create Your Profile</h1>
                        <p className='text-gray-600 text-sm md:text-base mt-2'>
                            Showcase your coding expertise and join the elite developers community
                        </p>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="profile-form flex flex-col gap-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder={'Full Name'} 
                            className="text-sm" 
                        />
                        <Input 
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            type={'number'} 
                            placeholder={'Age'} 
                            className="text-sm" 
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input 
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder={'Current Company'} 
                            className="text-sm" 
                        />
                        <Input 
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            placeholder={'Job Title'} 
                            className="text-sm" 
                        />
                    </div>
                    
                    {/* Skills Section */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Skills</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {['JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++'].map((skill) => (
                                <label key={skill} className="flex items-center space-x-2 cursor-pointer text-sm">
                                    <input 
                                        type="checkbox"
                                        checked={formData.skills.includes(skill)}
                                        onChange={() => handleSkillChange(skill)}
                                        className="rounded text-blue-500 w-4 h-4" 
                                    />
                                    <span>{skill}</span>
                                </label>
                            ))}
                        </div>
                        <Input 
                            name="otherSkills"
                            value={formData.otherSkills}
                            onChange={handleInputChange}
                            placeholder={'Add other skills (comma separated)'} 
                            className="text-sm mt-1.5" 
                        />
                    </div>

                    {/* Experience Level */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                        <select 
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleInputChange}
                            className="w-full border rounded-md py-1.5 px-3 text-sm"
                        >
                            <option value="">Select Experience Level</option>
                            <option value="beginner">Beginner (0-2 years)</option>
                            <option value="intermediate">Intermediate (2-5 years)</option>
                            <option value="advanced">Advanced (5+ years)</option>
                        </select>
                    </div>

                    {/* Button Section */}
                    <Button 
                        onClick={handleSubmit} 
                        disabled={loading}
                        className="w-full text-sm mt-2"
                    >
                        {loading ? 'Creating Profile...' : 'Create Profile'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCreate;