import React, { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";
import { imageAdapter } from "src/utils/utils";



export default function ImageGalleries({addApiUrl= true,images}) {
  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (item) => {
    return (
      <img
        src={imageAdapter(item?.url,addApiUrl)}
        alt={item.url}
        style={{ maxWidth: "100%", maxHeight: "40rem" }}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={imageAdapter(item?.url, addApiUrl)}
        alt={item.url}
        style={{ width: "100%" }}
      />
    );
  };

  return (
    <div className="mx-auto">
      <Galleria
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        style={{ maxWidth: "100%" }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
}
