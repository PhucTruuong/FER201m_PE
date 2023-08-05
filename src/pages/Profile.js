import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      {user && (
        <div>
          <img src={user.picture} alt="" />
          <span>{user.email}</span>
          <h5>{user.name}</h5>
        </div>
      )}
    </div>
  );
};

export default Profile;
