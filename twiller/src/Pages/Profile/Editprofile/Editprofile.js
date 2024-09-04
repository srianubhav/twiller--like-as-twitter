import React, { useState } from "react";
import { Box, Modal, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Editprofile.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
};

function Editchild({ dob, setdob }) {
  const [open, setopen] = useState(false);
  const handleopen = () => setopen(true);
  const handleclose = () => setopen(false);

  return (
    <React.Fragment>
      <div className="birthdate-section" onClick={handleopen}>
        <span>Edit</span>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleclose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 300 }}>
          <div className="text">
            <h2>Edit date of birth</h2>
            <p>
              This can only be changed a few times.
              <br />
              Make sure you enter the age of the person using the account.
            </p>
            <input 
              type="date" 
              onChange={(e) => setdob(e.target.value)} 
              value={dob} 
            />
            <button
              className="e-button"
              onClick={handleclose}
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const Editprofile = ({ user, loggedinuser, setLoggedinUser }) => {
  const [name, setname] = useState(loggedinuser[0]?.name || "");
  const [bio, setbio] = useState(loggedinuser[0]?.bio || "");
  const [location, setlocation] = useState(loggedinuser[0]?.location || "");
  const [website, setwebsite] = useState(loggedinuser[0]?.website || "");
  const [open, setopen] = useState(false);
  const [dob, setdob] = useState(loggedinuser[0]?.dob || "");

  const handlesave = () => {
    const editinfo = { name, bio, location, website, dob };

    fetch(`https:localhost:5000/${user?.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editinfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile updated:", data);
        setLoggedinUser((prevUser) => {
          return [{ ...prevUser[0], ...editinfo }];
        }); // Merge the updated info into the current user state
        setopen(false); // Close the modal after saving
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div>
      <button
        onClick={() => setopen(true)}
        className="Edit-profile-btn"
      >
        Edit profile
      </button>
      <Modal
        open={open}
        onClose={() => setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style} className="modal">
          <div className="header">
            <IconButton onClick={() => setopen(false)}>
              <CloseIcon />
            </IconButton>
            <h2 className="header-title">Edit Profile</h2>
            <button className="save-btn" onClick={handlesave}>
              Save
            </button>
          </div>
          <form className="fill-content">
            <TextField
              className="text-field"
              fullWidth
              label="Name"
              variant="filled"
              onChange={(e) => setname(e.target.value)}
              value={name}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Bio"
              variant="filled"
              onChange={(e) => setbio(e.target.value)}
              value={bio}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Location"
              variant="filled"
              onChange={(e) => setlocation(e.target.value)}
              value={location}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Website"
              variant="filled"
              onChange={(e) => setwebsite(e.target.value)}
              value={website}
            />
          </form>
          <div className="birthdate-section">
            <p>Birth Date</p>
            <Editchild dob={dob} setdob={setdob} />
          </div>
          <div className="last-section">
            <h2>{dob || "Add your date of birth"}</h2>
            <div className="last-btn">
              <h2>Switch to Professional</h2>
              <ChevronRightIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Editprofile;
