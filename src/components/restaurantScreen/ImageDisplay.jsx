/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import React from "react";
import { ImageList, ImageListItem } from "@mui/material/";

export default function StandardImageList({ selectedRestaurant }) {
  const { photos } = selectedRestaurant.place_data;
  const photosSlice = photos.slice(0, 6); // limit to 6 images

  return (
    <ImageList sx={{ width: "100%", height: "15%" }} cols={3} rowHeight={140}>
      {photosSlice.map((photo) => (
        <ImageListItem key={photo.photo_reference}>
          <img
            src={`https://maps.googleapis.com/maps/api/place/photo
?maxwidth=400
&photo_reference=${photo.photo_reference}
&key=AIzaSyAvFStCxa8h0bJEyVvKKe93gCUsEcJYZO4
`}
            alt="restaurant"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
