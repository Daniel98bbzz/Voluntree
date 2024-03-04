import React, { useState } from 'react';
import Header from "../../public/Components/Header";
import Footer from "../../public/Components/Footer";
import styles from "../styles/profilePage.module.css";

const ProfilePage = () => {
  const initialUser = {
    name: 'Gracia Tya',
    email: 'gracia@example.com',
    location: {
      city: 'Springfield',
      state: '', 
      country: ''
    },
    profilePicture: 'Images/farmer.jpg',
  };

  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...initialUser });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === "city" || name === "state" || name === "country") {
      setEditedUser({ 
        ...editedUser, 
        location: { ...editedUser.location, [name]: value }
      });
    } else {
      setEditedUser({ ...editedUser, [name]: value });
    }
  };

  const handleSave = () => {
    setUser({ ...editedUser });
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditedUser({ ...user });
    setEditMode(false);
  };

  const handleLogout = () => {
    // Implement logout logic
  };

  const handleProfilePictureChange = (e) => {
    // Implement logic to handle profile picture change
  };

  return (
    <div className={styles.profileContainer}>
      <Header />
      <div className={styles.profileHeader}>
        <img src={user.profilePicture} alt="Profile" className={styles.profilePicture} />
        <>
          <div className={styles.fieldContainer}>
            <p className={styles.fieldDescription}>Name:</p>
            <input type="text" name="name" value={editMode ? editedUser.name : user.name} onChange={handleInputChange} className={styles.inputField} />
          </div>
          
          <div className={styles.fieldContainer}>
            <p className={styles.fieldDescription}>Email:</p>
            <input type="email" name="email" value={editMode ? editedUser.email : user.email} onChange={handleInputChange} className={styles.inputField} />
          </div>
          
          <div className={styles.fieldContainer}>
            <p className={styles.fieldDescription}>City:</p>
            <input type="text" name="city" value={editMode ? editedUser.location.city : user.location.city} onChange={handleInputChange} placeholder="City" className={styles.inputField} />
          </div>
          
          <div className={styles.fieldContainer}>
            <p className={styles.fieldDescription}>State/Province:</p>
            <input type="text" name="state" value={editMode ? editedUser.location.state : user.location.state} onChange={handleInputChange} placeholder="State/Province" className={styles.inputField} />
          </div>
          
          <div className={styles.fieldContainer}>
            <p className={styles.fieldDescription}>Country:</p>
            <input type="text" name="country" value={editMode ? editedUser.location.country : user.location.country} onChange={handleInputChange} placeholder="Country" className={styles.inputField} />
          </div>
          
          {/* Additional fields */}
          {editMode && (
            <>
              <div className={styles.fieldContainer}>
                <p className={styles.fieldDescription}>New Password:</p>
                <input type="password" name="password" placeholder="New Password" onChange={handleInputChange} className={styles.inputField} />
              </div>
              
              <div className={styles.fieldContainer}>
                <p className={styles.fieldDescription}>Date of Birth:</p>
                <input type="date" name="dateOfBirth" value={editedUser.dateOfBirth} onChange={handleInputChange} className={styles.inputField} />
              </div>
              
              <div className={styles.fieldContainer}>
                <p className={styles.fieldDescription}>Phone:</p>
                <input type="tel" name="phone" value={editedUser.phone} onChange={handleInputChange} className={styles.inputField} />
              </div>
            </>
          )}
          {/* Save and Cancel buttons */}
          {editMode ? (
            <div className={styles.buttonContainer}>
              <button onClick={handleSave} className={styles.button}>Save</button>
              <button onClick={handleCancelEdit} className={styles.button}>Cancel</button>
            </div>
          ) : (
            <div className={styles.buttonContainer}>
              <button onClick={handleEdit} className={styles.button}>Edit</button>
              <button onClick={handleLogout} className={styles.button}>Logout</button>
            </div>
          )}
        </>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
