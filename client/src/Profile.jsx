// Profile.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images when the component mounts
    fetchImages();
  }, [userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('userId', userId);

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
        // After successful upload, fetch updated list of images
        fetchImages();
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error during image upload:', error.message);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/images/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setImages(data.images);
      } else {
        console.error('Failed to fetch images');
      }
    } catch (error) {
      console.error('Error during image fetch:', error.message);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete/${imageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Image deleted successfully');
        // After successful deletion, fetch updated list of images
        fetchImages();
      } else {
        console.error('Image deletion failed');
      }
    } catch (error) {
      console.error('Error during image deletion:', error.message);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6">Welcome to your profile, User {userId}</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Upload Profile Picture</h3>
        <div className="flex items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 mr-4 w-60"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Upload
          </button>
        </div>
      </div>
      {/* Display uploaded images here */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative overflow-hidden aspect-ratio-square bg-gray-300">
            <img
              src={image.url}
              alt={`User ${userId}'s Image`}
              className="object-cover w-full h-full"
            />
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
