import React, { useEffect, useState } from "react";
import axios from "axios";

function Upload() {
  const [imageFile, setImageFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  

  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    const res = await axios.post("/uploadFile", formData);
    console.log("Response from the server", res);

    setImageUrl(res.data.location);
  };
  return (
    <div>
      <div>
        <form>
          <label htmlFor="imageFile">Upload Images</label>
          <input
            type="file"
            name="imageFile"
            accept="image/jpeg, image/jp, image/png"
            onChange={handleImage}
          />
          <button onClick={onSubmit}>Submit</button>
        </form>
      </div>
      <p>Photo</p>

      {/* {imageUrl?
      <img src={imageUrl}></img>:null} */}
      
      <img  src={imageUrl} alt="this is photo" />
    </div>
  );
}
export default Upload;
