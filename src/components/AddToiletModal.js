// AddToiletModal.js
import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Autocomplete,
} from "@mui/material";
import AutoCompleteGoogle, { usePlacesWidget } from "react-google-autocomplete";
import { WithContext as ReactTags } from "react-tag-input";
import Dropzone from "react-dropzone";
import ToiletService from "../services/ToiletService";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function AddToiletModal({ open, onClose }) {
  const [toilet, setToilet] = useState({
    name: "",
    address: "",
    tags: [],
    description: "",
    images: "",
    // Add other toilet properties here
  });

  const handleChange = (event) => {
    setToilet({
      ...toilet,
      [event.target.name]: event.target.value,
    });
  };

  const handleDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setToilet({
          ...toilet,
          images: reader.result,
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const toiletData = {
      ...toilet,
      tags: toilet.tags.join(","),
    };
    ToiletService.create(toiletData).then((response) => {
      console.log(response.data);
      onClose();
    });
  };

  const handleTagsChange = (event, value) => {
    setToilet({
      ...toilet,
      tags: value,
    });
  };

  const { ref: materialRef } = usePlacesWidget({
    apiKey: "AIzaSyCkWaxfKNAgjBQHtGKW_rQg6uPnr-zzgFg",
    onPlaceSelected: (place) =>
      setToilet({
        ...toilet,
        address: place.formatted_address,
        coords: {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        },
      }),
    inputAutocompleteValue: "city",
    options: {
      country: "np",
    },
  });
  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Toilet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a toilet, please enter the toilet details here.
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={toilet.name}
            onChange={handleChange}
          />

          <AutoCompleteGoogle
            apiKey="AIzaSyCkWaxfKNAgjBQHtGKW_rQg6uPnr-zzgFg"
            style={{
              margin: "0.6rem 0",
              width: "100%",
              padding: "1rem",
              boxSizing: "border-box",
            }}
            onPlaceSelected={(place) => {
              setToilet((toilet) => ({
                ...toilet,
                address: place.formatted_address,
                coords: {
                  latitude: place.geometry.location.lat(),
                  longitude: place.geometry.location.lng(),
                },
              }));
            }}
            types={["address"]}
            componentRestrictions={{ country: "us" }}
          />

          <Autocomplete
            multiple
            id="tags"
            options={[
              "Gender Neutral",
              "Baby Feeding and Changing",
              "Disabled Friendly",
              "Senior Friendly",
              "Commercial Building",
              "Government Building",
            ]}
            freeSolo
            margin="dense"
            value={toilet.tags}
            onChange={handleTagsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                variant="outlined"
                placeholder="Tags(Optional)"
              />
            )}
          />
          <TextField
            required
            multiline
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={toilet.description}
            onChange={handleChange}
          />
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Box
                    sx={{
                      border: "3px dashed grey",
                      padding: "0.6rem",
                      borderRadius: "12px",
                    }}
                  >
                    Upload the image of the toilet
                  </Box>
                  {toilet?.images && (
                    <Box>
                      <img
                        style={{
                          height: "100px",
                          width: "100px",
                        }}
                        src={toilet?.images}
                        alt="Preview"
                      />
                    </Box>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
          {/* Add more text fields for other toilet properties */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddToiletModal;
