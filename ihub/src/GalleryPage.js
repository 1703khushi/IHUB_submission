import React, { useState, useEffect } from 'react';
// import LogoutIcon from "@mui/icons-material/Logout";

function GalleryPage({ onLogout }) {
    const [imageURL, setImageURL] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [renameIndex, setRenameIndex] = useState(-1);
    const [newName, setNewName] = useState('');

    const handleImageURLChange = (event) => {
        setImageURL(event.target.value);
    };

    const handleImageUpload = () => {
        if (imageURL.trim() !== '') {
            setGalleryImages([...galleryImages, { url: imageURL, name: imageURL }]);
            setImageURL('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        onLogout();
    };

    const handleRename = (index) => {
        setRenameIndex(index);
        setNewName(galleryImages[index].name);
    };

    const handleRenameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleRenameSubmit = () => {
        if (newName.trim() !== '') {
            const updatedImages = [...galleryImages];
            updatedImages[renameIndex].name = newName;
            setGalleryImages(updatedImages);
            setRenameIndex(-1);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowLeft') {
            setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
        } else if (event.key === 'ArrowRight') {
            setCurrentIndex((prevIndex) => Math.min(galleryImages.length - 1, prevIndex + 1));
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [currentIndex]);
    return (
        <div className='gal'>
            <div className='header'>
                <div className="headerLeft">
                    <span className="gallery">Gallery</span>
                </div>
                {/* <h2>Gallery</h2> */}
                <div className="headerRight">
                    <button className="logout" onClick={handleLogout}>
                        {/* <LogoutIcon /> */}
                        Logout
                    </button>
                </div>
            </div>
            <div className="login_form">
                <input
                    type="text"
                    placeholder="Enter Image URL"
                    value={imageURL}
                    onChange={handleImageURLChange}
                />
                <button className="logout" onClick={handleImageUpload}>Upload Image</button>
            </div>
            <div className="image-gallery">
                {galleryImages.map((image, index) => (
                    <div
                        key={index}
                        className={`relative border rounded p-2 cursor-pointer ${index === currentIndex ? 'border-blue-500' : ''
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    >
                        <img src={image.url} alt={`Image ${index}`} className="w-full h-auto" />
                        {index === currentIndex && (
                            <div className="absolute inset-0 bg-black opacity-75 flex items-center justify-center">
                                <p className="gallery">{image.name}</p>
                                {renameIndex === index ? (
                                    <div >
                                        <input
                                            type="text"
                                            // className="border p-1 bg-transparent text-white"
                                            value={newName}
                                            onChange={handleRenameChange}
                                        />
                                        <button
                                        className="logout"
                                            // className="bg-blue-500 hover:bg-blue-600 px-2 ml-1"
                                            onClick={handleRenameSubmit}
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="logout"
                                        onClick={() => handleRename(index)}
                                    >
                                        Rename
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GalleryPage;  