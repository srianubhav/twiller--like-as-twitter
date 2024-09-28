import React, { useState, useEffect } from "react";
import Post from "../Posts/posts";
import { useNavigate } from "react-router-dom";
import "./Mainprofile.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import LockResetIcon from "@mui/icons-material/LockReset";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Editprofile from "../Editprofile/Editprofile";
import axios from "axios";
import useLoggedinuser from "../../../hooks/useLoggedinuser";

const Mainprofile = ({ user }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedinuser] = useLoggedinuser();
  const username = user?.email ? user.email.split("@")[0] : "Guest";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      // Use HTTP for local development
      fetch(`http://localhost:5000/userpost?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
          // Optionally set an error state here to notify the user
        });
    }
  }, [user?.email]);

  const handleUploadImage = (e, type) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    axios
      .post("https://api.imgbb.com/1/upload?key=7a3a32e77fec5c9c83f6ad2049f32940", formData)
      .then((res) => {
        const url = res.data.data.display_url;
        const updateData = {
          email: user?.email || "",
          [type]: url,
        };

        if (url) {
          return fetch(`http://localhost:5000/userupdate/${user?.email || ""}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          });
        }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(`${type === "profileImage" ? "Profile" : "Cover"} image updated:`, data);
      })
      .catch((err) => {
        console.error(`Error updating ${type === "profileImage" ? "profile" : "cover"} image:`, err);
        window.alert(`Failed to upload ${type === "profileImage" ? "profile" : "cover"} image.`);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <ArrowBackIcon className="arrow-icon" onClick={() => navigate("/")} />
      <h4 className="heading-4">{username}</h4>
      <div className="mainprofile">
        <div className="profile-bio">
          <div>
            <div className="coverImageContainer">
              <img
                src={
                  loggedinuser[0]?.coverimage
                    ? loggedinuser[0].coverimage
                    : user?.photoURL || "https://via.placeholder.com/150"
                }
                alt="Cover"
                className="coverImage"
              />
              <div className="hoverCoverImage">
                <div className="imageIcon_tweetButton">
                  <label htmlFor="coverImage" className="imageIcon">
                    {isLoading ? (
                      <LockResetIcon className="photoIcon photoIconDisabled" />
                    ) : (
                      <CenterFocusWeakIcon className="photoIcon" />
                    )}
                  </label>
                  <input
                    type="file"
                    id="coverImage"
                    className="imageInput"
                    onChange={(e) => handleUploadImage(e, "coverimage")}
                  />
                </div>
              </div>
            </div>
            <div className="avatar-img">
              <div className="avatarContainer">
                <img
                  src={
                    loggedinuser[0]?.profileImage
                      ? loggedinuser[0].profileImage
                      : user?.photoURL || "https://via.placeholder.com/150"
                  }
                  alt="Avatar"
                  className="avatar"
                />
                <div className="hoverAvatarImage">
                  <div className="imageIcon_tweetButton">
                    <label htmlFor="profileImage" className="imageIcon">
                      {isLoading ? (
                        <LockResetIcon className="photoIcon photoIconDisabled" />
                      ) : (
                        <CenterFocusWeakIcon className="photoIcon" />
                      )}
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      className="imageInput"
                      onChange={(e) => handleUploadImage(e, "profileImage")}
                    />
                  </div>
                </div>
              </div>
              <div className="userInfo">
                <div>
                  <h3 className="heading-3">
                    {loggedinuser[0]?.name || "No Name Provided"}
                  </h3>
                  <p className="usernameSection">@{username}</p>
                </div>
                <Editprofile user={user} loggedinuser={loggedinuser} />
              </div>
              <div className="infoContainer">
                {loggedinuser[0]?.bio && <p>{loggedinuser[0].bio}</p>}
                <div className="locationAndLink">
                  {loggedinuser[0]?.location && (
                    <p className="subInfo">
                      <MyLocationIcon /> {loggedinuser[0].location}
                    </p>
                  )}
                  {loggedinuser[0]?.website && (
                    <p className="subInfo link">
                      <AddLinkIcon /> {loggedinuser[0].website}
                    </p>
                  )}
                </div>
              </div>
              <h4 className="tweetsText">Tweets</h4>
              <hr />
            </div>
            {posts.length > 0 ? (
              posts.map((p, index) => <Post key={index} p={p} />)
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainprofile;

