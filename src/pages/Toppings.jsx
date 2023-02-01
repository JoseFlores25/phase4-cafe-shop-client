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
  const { state } = useLocation();
  const { item, method } = state || {};

  const handleGetToppings = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/toppings?coffee_id=${item?.id}`
      );
      setTopppings(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (method === "see-more-details") {
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      {toppings?.map((item) => (
        <Box
          style={{
            backgroundColor: "black",
            height: 150,
            margin: 20,
            width: "50vw",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Typography
            style={{
              fontWeight: "600",
              color: "white",
              fontSize: 24,
              letterSpacing: 1.1,
            }}
          >
            {item?.name}
          </Typography>
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
