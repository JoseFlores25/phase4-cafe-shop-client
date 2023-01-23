import {
  Typography,
  Box,
  FormControl,
  OutlinedInput,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Toppings = ({ handleAddTopping }) => {
  const [name, setName] = useState("");
  const [toppings, setTopppings] = useState([]);
  const [ratings, setRatings] = useState([]);
  const { state } = useLocation();
  const { item, method, currentUser } = state || {};

  const handleGetRatings = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/feedback?coffee_id=${item?.id}&user_id=${currentUser?.id}`
      );
      setRatings(data);
    } catch (error) {}
  };

  const handleGetToppings = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/topping?coffee_id=${item?.id}`
      );
      setTopppings(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (method === "see-more-details") {
      handleGetRatings();
      handleGetToppings();
    }
  }, []);

  const addTopping = () => {
    handleAddTopping({ name, coffee_id: item.id });
  };

  return method === "see-more-details" ? (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Typography>Toppings</Typography>
      {toppings?.map((item) => (
        <Typography>{item?.name}</Typography>
      ))}
      <Typography>Feedback</Typography>
      {ratings?.map((item) => (
        <Box>
          <Typography>{item?.title}</Typography>
          <Typography>{item?.description}</Typography>
        </Box>
      ))}
    </Box>
  ) : (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <FormControl sx={{ width: "25ch" }}>
        <OutlinedInput
          placeholder="name"
          //   value={coffee.name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={addTopping}>
          <Typography>Add topping</Typography>
        </Button>
      </FormControl>
    </Box>
  );
};

export default Toppings;
