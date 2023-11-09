import React, { useState } from "react";
import Dropzone from "react-dropzone";

const UserProfile = (props) => {
  const [userInfoState, setUserInfoState] = useState(props.user);
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
    try {
      const response = await fetch(`/api/v1/users/${userInfoState.id}`, {
        method: "PATCH",
        headers: {
          Accept: "image/jpeg",
        },
        body: newImageBody,
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const { body } = await response.json();
      setUserInfoState({
        ...userInfoState,
        image: body.image,
      });
    } catch (error) {
      console.error(`Error in addProfileImage Fetch: ${error.message}`);
    }
  };
  return (
    <>
      <div className="profile-detail-container cell medium-6 medium-cell-block-y">
        <h1 className="profile-showpage-title">{userInfoState?.username}</h1>
        <h3 className="profile-showpage-email">{userInfoState?.email}</h3>
        <img className="profile-pic" src={userInfoState?.image}></img>

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
          <input className="submit-pic-button" type="submit"></input>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
