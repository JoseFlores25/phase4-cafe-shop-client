import { Typography, FormControl, OutlinedInput, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Order = ({ navigate, handleEditProduct, handleAddCoffee }) => {
  const { state } = useLocation();
  const { method, item } = state || {};
  const [coffee, setCoffee] = useState({ name: "", price: "", store: '' });

  useEffect(() => {
    if (item) setCoffee(item);
  }, [item]);
  const handleInput = (e, type) => {
    const temp = { ...coffee };
    temp[type] = e.target.value;
    setCoffee(temp);
  };

  const addCoffee = () => {
    if (!coffee.name || !coffee.price) return;
    navigate(-1);
    handleAddCoffee(coffee);
  };

  const updatCoffee = () => {
    navigate(-1);
    handleEditProduct({ ...coffee, id: item.id });
  };
  return (
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
          value={coffee.name}
          onChange={(e) => handleInput(e, "name")}
        />
        <OutlinedInput
          placeholder="price"
          value={coffee.price}
          onChange={(e) => handleInput(e, "price")}
        />
        <OutlinedInput
          placeholder="store name"
          value={coffee.store}
          onChange={(e) => handleInput(e, "store")}
        />
        <Button onClick={method === "update" ? updatCoffee : addCoffee}>
          <Typography>
            {method === "update" ? `Update ${item.name}` : "Add to menu"}
          </Typography>
        </Button>
      </FormControl>
    </Box>
  );
};

export default Order;
