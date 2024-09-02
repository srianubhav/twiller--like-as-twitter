import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';

const useLoggedinuser = () => {
    const { user } = useUserAuth();
    const email = user?.email;
    const [loggedinuser, setloggedinuser] = useState({});

    useEffect(() => {
        // Using backticks to create a template literal
        fetch(`https://twiller-like-as-twitter.onrender.com/loggedinuser?email=${email}`)
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
    }, [email]); // Removed `loggedinuser` from dependencies to prevent infinite loop

    return [loggedinuser, setloggedinuser];
}

export default useLoggedinuser;
