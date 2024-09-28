import React from 'react';
import '../pages.css'; // Ensure this file includes Tailwind classes or is adjusted accordingly
import Mainprofile from '../Profile/Mainprofile/Mainprofile';
import { useUserAuth } from '../../context/UserAuthContext';
import './Profile.css'; 

const Profile = () => {
  const { user } = useUserAuth();
  
  return (
    <div className="profilePage">
      <Mainprofile user={user} />
      <div className=" font-medium">
        
      </div>
    </div>
  );
};

export default Profile;
