/** 
import React, { useState, useEffect } from 'react';

const PostCreator = () => {
  const [userData, setUserData] = useState(null);
  const [postContent, setPostContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data
    fetch('http://localhost:5000/loggedinuser?email=user@example.com') // Replace with actual user email
      .then(res => res.json())
      .then(data => {
        setUserData(data[0]); // Assuming data is an array
      })
      .catch(err => console.error('Error fetching user data:', err));
  }, []);

  const handlePost = () => {
    if (!userData) {
      setError('User data is not loaded yet.');
      return;
    }

    const { following, friends } = userData;

    // Restriction checks
    const followingCount = following ? following.length : 0;
    const friendsCount = friends ? friends.length : 0;

    // Current time in IST
    const now = new Date();
    const hours = now.getUTCHours() + 5; // Convert to IST
    const minutes = now.getUTCMinutes();

    if (followingCount === 0 && (hours !== 10 || (minutes < 0 || minutes > 30))) {
      setError('Posting allowed only between 10 AM to 10:30 AM IST for users with no followers.');
      return;
    }

    if (followingCount === 2) {
      // Fetch today's posts count
      fetch('http://localhost:5000/userpost?email=user@example.com') // Replace with actual user email
        .then(res => res.json())
        .then(posts => {
          const today = new Date().setHours(0, 0, 0, 0);
          const postsToday = posts.filter(post => new Date(post.createdAt).setHours(0, 0, 0, 0) === today);

          if (postsToday.length >= 2) {
            setError('You can only post twice a day.');
            return;
          }
        })
        .catch(err => console.error('Error fetching posts:', err));
    }

    if (friendsCount <= 10) {
      // Regular posting restrictions
      setError('You can post multiple times a day if you have more than 10 friends.');
      return;
    }

    // Proceed with posting
    // You would need to make an API call to create a post here
    console.log('Post content:', postContent);
    setError('');
  };

  return (
    <div>
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button onClick={handlePost}>Post</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PostCreator;*/

import React, { useState, useEffect } from 'react';

const PostCreator = () => {
  const [userData, setUserData] = useState(null);
  const [postContent, setPostContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data
    fetch('http://localhost:5000/loggedinuser?email=user@example.com') // Replace with actual user email
      .then(res => res.json())
      .then(data => {
        setUserData(data[0]); // Assuming data is an array
      })
      .catch(err => console.error('Error fetching user data:', err));
  }, []);

  const handlePost = () => {
    if (!userData) {
      setError('User data is not loaded yet.');
      return;
    }

    const { following, friends } = userData;

    // Restriction checks
    const followingCount = following ? following.length : 0;
    const friendsCount = friends ? friends.length : 0;

    // Current time in IST
    const now = new Date();
    const hours = now.getUTCHours() + 5; // Convert to IST
    const minutes = now.getUTCMinutes();

    if (followingCount === 0 && (hours !== 10 || (minutes < 0 || minutes > 30))) {
      setError('Posting allowed only between 10 AM to 10:30 AM IST for users with no followers.');
      return;
    }

    if (followingCount === 2) {
      // Fetch today's posts count
      fetch('http://localhost:5000/userpost?email=user@example.com') // Replace with actual user email
        .then(res => res.json())
        .then(posts => {
          const today = new Date().setHours(0, 0, 0, 0);
          const postsToday = posts.filter(post => new Date(post.createdAt).setHours(0, 0, 0, 0) === today);

          if (postsToday.length >= 2) {
            setError('You can only post twice a day.');
            return;
          }
        })
        .catch(err => console.error('Error fetching posts:', err));
    }

    if (friendsCount <= 10) {
      // Regular posting restrictions
      setError('You can post multiple times a day if you have more than 10 friends.');
      return;
    }

    // Proceed with posting
    // You would need to make an API call to create a post here
    console.log('Post content:', postContent);
    setError('');
  };

  return (
    <div>
      <div className="post-creator">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button onClick={handlePost}>Post</button>
        {error && <div className="error-message">{error}</div>}
      </div>

      {userData && (
        <div className="user-info">
          <div className="following">
            <h3>Following</h3>
            <ul>
              {userData.following && userData.following.map(follow => (
                <li key={follow._id}>{follow.name}</li>
              ))}
            </ul>
          </div>

          <div className="friends">
            <h3>Friends</h3>
            <ul>
              {userData.friends && userData.friends.map(friend => (
                <li key={friend._id}>{friend.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCreator;

