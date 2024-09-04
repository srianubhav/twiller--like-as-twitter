import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';

const useLoggedinuser = () => {
    const { user } = useUserAuth();
    const email = user?.email;
    const [loggedinuser, setloggedinuser] = useState({});

    useEffect(() => {
        if (email) {  // Check if email is defined before making the fetch call
            fetch(`http://localhost:5000/loggedinuser?email=${email}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    setloggedinuser(data);
                })
                .catch(error => {
                    console.error('Error fetching logged-in user:', error);
                });
        }
    }, [email]); // Only re-run the effect if the email changes

    return [loggedinuser, setloggedinuser];
}

export default useLoggedinuser;
