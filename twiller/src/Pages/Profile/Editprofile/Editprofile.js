import React, { useState } from "react";
import { Box, Modal, TextField, IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Editprofile.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90%', // Adjust width for responsiveness
  maxWidth: 600,
  height: 'auto', // Set height to auto to fit content
  maxHeight: 600, // Max height for larger screens
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
  overflowY: 'auto' // Allow scrolling if content overflows
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
        <Box sx={{ ...style, maxWidth: 300, maxHeight: 300 }}>
          <div className="text">
            <h2>Edit Date of Birth</h2>
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
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(false); 

  const handlesave = () => {
    setLoading(true);
    const editinfo = { name, bio, location, website, dob };

    fetch(`http://localhost:5000/${user?.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editinfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setSuccess(true);
        setLoggedinUser((prevUser) => {
          return [{ ...prevUser[0], ...editinfo }];
        });
        setopen(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("Error updating profile. Please try again.");
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div>
      <button
        onClick={() => setopen(true)}
        className="Edit-profile-btn"
        disabled={loading} 
      >
        Edit Profile
      </button>
      <Modal
        open={open}
        onClose={() => setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">
          <div className="header">
            <IconButton onClick={() => setopen(false)} disabled={loading}>
              <CloseIcon />
            </IconButton>
            <h2 className="header-title">Edit Profile</h2>
            <button className="save-btn" onClick={handlesave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
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
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Editprofile;
