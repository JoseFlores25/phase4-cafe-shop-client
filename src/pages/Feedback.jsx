import {
  Typography,
  Box,
  FormControl,
  OutlinedInput,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Feedback = ({ handleAddFeedback }) => {
  const [rating, setRating] = useState({ title: "", description: "" });
  const { state } = useLocation();
  const { item } = state || {};

  const handleInput = (e, type) => {
    const temp = { ...rating };
    temp[type] = e.target.value;
    console.log('[debug]', temp, 'temp')
    setRating(temp);
  };

  const addFeedback = () => {
    handleAddFeedback({ ...rating, coffee_id: item.id });
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <p>Cafe Latino</p>
      <FormControl sx={{ width: "25ch" }}>
        <OutlinedInput
          placeholder="title"
          onChange={(e) => handleInput(e, "title")}
        />
        <OutlinedInput
          placeholder="description"
          onChange={(e) => handleInput(e, "description")}
        />
        <Button onClick={addFeedback}>
          <Typography>Add feedback</Typography>
        </Button>
      </FormControl>
    </Box>
  );
};

export default Feedback;
