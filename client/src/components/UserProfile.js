import React from "react";

const UserProfile = (props) => {
  return (
    <>
      <h1>{props.userData?.username}</h1>
      <h3>{props.userData?.email}</h3>
      <div className="profile-pic"></div>
    </>
  );
};

export default UserProfile;
