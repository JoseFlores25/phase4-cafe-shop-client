import { Typography, Box, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FeedbackList = () => {
  const [ratings, setRatings] = useState([]);
  const { state } = useLocation();
  const { item, method } = state || {};
  const user_id = +localStorage.getItem("user_id");
  const handleGetRatings = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/feedbacks?coffee_id=${item?.id}`
      );
      setRatings(data);
    } catch (error) {}
  };

  const handleDeleteFeedback = async (feedback) => {
    if (feedback?.user_id !== user_id) {
      alert("Sorry, this feedback does not belong to you!");
      return;
    }

    try {
      const { data } = await axios.delete(
        `http://localhost:8000/feedbacks/${feedback.id}`
      );

      handleGetRatings();
    } catch (err) {
      alert(
        "Sorry, could not delete this feedback, maybe you did not created it?"
      );
    }
  };

  useEffect(() => {
    if (method === "see-more-details") {
      handleGetRatings();
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {ratings?.map((item) => (
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
            {item?.title}
          </Typography>
          <Typography style={{ color: "white", fontSize: "300", fontSize: 14 }}>
            {item?.description}
          </Typography>
          <Button
            style={{ backgroundColor: "gray", color: "white" }}
            onClick={() => handleDeleteFeedback(item)}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default FeedbackList;
