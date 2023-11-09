import React, { useState } from "react";
import Dropzone from "react-dropzone";
import getProfileImage from "../services/getProfileImage";

const UserProfile = (props) => {
  const [imageData, setImageData] = useState({
    image: {},
  });

  const handleImageUpload = (acceptedImage) => {
    setImageData({
      ...imageData,
      image: acceptedImage[0],
    });
  };

  const addProfileImage = async (event) => {
    event.preventDefault();
    const newImageBody = new FormData();
    newImageBody.append("image", imageData.image);
    const profilePic = await getProfileImage(props.user.id, newImageBody);
    props.setCurrentUser({
      ...props.user,
      image: profilePic,
    });
  };

  return (
    <>
      <h1>{props.user.username}</h1>
      <h3>{props.user.email}</h3>
      <img className="profile-pic" src={props.user.image}></img>
      <form onSubmit={addProfileImage}>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="drag-n-drop">
                  <p>Upload A Picture - drag 'n' drop or click to upload</p>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        <input type="submit"></input>
      </form>
    </>
  );
};

export default UserProfile;
