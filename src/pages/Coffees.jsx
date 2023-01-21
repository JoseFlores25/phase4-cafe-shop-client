import React from "react";
import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
const Coffee = ({
  coffees,
  currentUser,
  isAuthenticated,
  navigate,
  handleDeleteCoffee,
}) => {
  useEffect(() => {}, [isAuthenticated]);
  return isAuthenticated ? (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        // justifyContent:'center',
        width: "100vw",
        height: "100vh",
      }}
    >
      <Button
        onClick={() => navigate("/order", { state: { method: "create" } })}
      >
        <Typography>Add To Menu</Typography>
      </Button>
      {coffees.map((item) => (
        <Box
          style={{
            borderRadius: 20,
            marginBottom: 10,
            alignSelf: "center",
            backgroundColor: "tomato",
            width: 200,
            paddingBottom: 10,
            paddingTop: 20,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>{item?.name}</Typography>
          <Typography>${item?.price}</Typography>
          <Button onClick={() => handleDeleteCoffee(item?.id)}>
            <Typography>Delete</Typography>
          </Button>
          <Button
            onClick={() =>
              navigate("/topping", {
                state: { item: item },
              })
            }
          >
            <Typography>Add topping</Typography>
          </Button>
          <Button
            onClick={() =>
              navigate("/order", {
                state: { method: "update", item: item },
              })
            }
          >
            <Typography>Edit</Typography>
          </Button>
          <Button
            onClick={() =>
              navigate("/feedback", {
                state: { method: "update", item: item },
              })
            }
          >
            <Typography>Leave Feedback</Typography>
          </Button>
          <Button
            onClick={() =>
              navigate("/topping", {
                state: { method: "see-more-details", item, currentUser },
              })
            }
          >
            <Typography>See more details</Typography>
          </Button>
        </Box>
      ))}
    </Box>
  ) : (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        // justifyContent:'center',
        width: "100vw",
        height: "100vh",
      }}
    >
      <Typography>Sorry you need to be authenticated</Typography>
    </Box>
  );
};

export default Coffee;
