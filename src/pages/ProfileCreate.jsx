import React, { useState } from 'react'
import { Input } from '../components/Input'
import Button from '../components/Button'

const ProfileCreate = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-10 px-4'>
            <div className="w-full max-w-2xl  rounded-lg shadow-lg p-8">
                <h1 className='text-3xl font-bold text-center mb-2'>Create Your Profile</h1>
                <p className='text-gray-600 text-center mb-8'>
                    Showcase your coding expertise and join the elite developers community
                </p>

                {/* Profile Image Upload */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
                        {preview ? (
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-gray-400">No image</span>
                            </div>
                        )}
                    </div>
                    <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Upload Photo
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                {/* Basic Details */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder={'Full Name'} />
                        <Input type={'number'} placeholder={'Age'} />
                    </div>
                    <Input placeholder={'Current Company'} />
                    <Input placeholder={'Job Title'} />
                    
                    {/* Skills Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Skills</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {['JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++'].map((skill) => (
                                <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="rounded text-blue-500" />
                                    <span>{skill}</span>
                                </label>
                            ))}
                        </div>
                        <Input placeholder={'Add other skills (comma separated)'} />
                    </div>

                    {/* Experience Level */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                        <select className="w-full border rounded-md py-2 px-3">
                            <option value="">Select Experience Level</option>
                            <option value="beginner">Beginner (0-2 years)</option>
                            <option value="intermediate">Intermediate (2-5 years)</option>
                            <option value="advanced">Advanced (5+ years)</option>
                        </select>
                    </div>

                    <Button className="w-full mt-6">Create Profile</Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileCreate