// ToiletList.js
import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddToiletModal from "./AddToiletModal";
import ToiletService from "../services/ToiletService";

function ToiletList() {
  const [toilets, setToilets] = useState([]);
  const [selectedToilet, setSelectedToilet] = useState(null);
  const [open, setOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const load = () =>
    ToiletService.getAll().then((response) => {
      setToilets(response.data);
    });

  useEffect(() => {
    load();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (toilet) => {
    load();
    setOpen(false);
  };

  const handleReviewOpen = (toilet) => {
    setSelectedToilet(toilet);
    setReviewOpen(true);
  };

  const handleReviewClose = () => {
    setReviewOpen(false);
  };

  const handleDeleteReview = (user) => {
    ToiletService.deleteReview(selectedToilet.id, user).then((response) => {
      console.log(response.data);
      handleReviewClose();
    });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Toilet
      </Button>
      <AddToiletModal open={open} onClose={handleClose} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              {/* Add more table cells for other toilet properties */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toilets.map((toilet) => (
              <TableRow key={toilet.id}>
                <TableCell>{toilet.name}</TableCell>
                <TableCell>{toilet.address}</TableCell>
                {/* Add more table cells for other toilet properties */}
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleReviewOpen(toilet)}
                  >
                    View Reviews
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={reviewOpen} onClose={handleReviewClose}>
        <DialogTitle>Reviews for {selectedToilet?.name}</DialogTitle>
        <DialogContent>
          {!selectedToilet?.reviews?.length ? (
            <DialogContentText>No reviews added</DialogContentText>
          ) : (
            selectedToilet?.reviews?.map((review, index) => (
              <DialogContentText key={index}>
                {review.text} - {review.user}
                <Button onClick={() => handleDeleteReview(review.user)}>
                  Delete Review
                </Button>
              </DialogContentText>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ToiletList;
