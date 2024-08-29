import React from 'react'
import '../pages.css'
import Mainprofile from '../Profile/Mainprofile/Mainprofile'
import { useUserAuth } from '../../context/UserAuthContext';

const Profile = () => {
  const {user}= useUserAuth()
  // const user = {
  //  displayName: "bithead",
  // email: "bithead@gmail.com",
 // };
  return (
   
    <div className='profilePage'>
      <Mainprofile user={user}/>
      profile
      
    </div>
  )
}

export default Profile
