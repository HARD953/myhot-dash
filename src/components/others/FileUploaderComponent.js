import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import ReactImageUploading from "react-images-uploading";
import { chambreAddImages } from "src/api/chambres/chambres";


export default function TemplateDemo({resourceId}) {

      const [selectedFiles, setSelectedFiles] = useState([]);

      const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
      };


    const saveImages = async()=>{
      try {
        const formData = new FormData()
        for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('images', selectedFiles[i]);
      }
        const response = await chambreAddImages(resourceId, formData);
      } catch (error) {
        console.error("Some wrong Uploading Images",error)
      }
    }




  return (
    <div className="">

      <input type="file" multiple onChange={handleFileChange} />

      <Button
        onClick={saveImages}
        label="Save images"
        className="p-button-primary p-button-outlined rounded-pill"
      />
    </div>
  );
}
