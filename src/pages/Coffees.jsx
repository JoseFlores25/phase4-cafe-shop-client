import React from "react";
import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import CoffeeIcon from "@mui/icons-material/Coffee";
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
        <CoffeeIcon style={{ color: "black" }} />
        <Typography style={{ color: "black", fontWeight: "bold" }}>
          Add To Menu
        </Typography>
      </Button>
      {coffees.map((item) => (
        <Box
          style={{
            borderRadius: 20,
            marginBottom: 10,
            alignSelf: "center",
            backgroundColor: "black",
            width: "50vw",
            paddingBottom: 10,
            paddingTop: 20,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography style={{ color: "white", fontSize: 40 }}>
            {item?.name}
          </Typography>
          <Typography style={{ color: "white", fontSize: 20 }}>
            ${item?.price}
          </Typography>
          <Typography
            style={{ color: "white", fontSize: 14, marginBottom: 20 }}
          >
            Sold at: {item?.store}
          </Typography>
          {/* <Button onClick={() => handleDeleteCoffee(item?.id)}>
            <Typography>Delete</Typography>
          </Button> */}
          <Button
            onClick={() =>
              navigate("/toppings", {
                state: { item: item },
              })
            }
            style={{
              backgroundColor: "gray",
              margin: 8,
            }}
          >
            <Typography style={{ color: "white", fontSize: 20 }}>
              Add topping
            </Typography>
          </Button>
          <Button
            onClick={() =>
              navigate("/order", {
                state: { method: "update", item: item },
              })
            }
            style={{
              backgroundColor: "gray",
              margin: 8,
            }}
          >
            <Typography style={{ color: "white", fontSize: 20 }}>
              Edit
            </Typography>
          </Button>
          <Button
            onClick={() =>
              navigate("/feedback", {
                state: { method: "update", item: item },
              })
            }
            style={{
              backgroundColor: "gray",
              margin: 8,
            }}
          >
            <Typography style={{ color: "white", fontSize: 20 }}>
              Leave Feedback
            </Typography>
          </Button>
          <Button
            onClick={() =>
              navigate("/reviews", {
                state: { method: "see-more-details", item, currentUser },
              })
            }
            style={{
              backgroundColor: "gray",
              margin: 8,
            }}
          >
            <Typography style={{ fontSize: 12, color: "white" }}>
              Reviews
            </Typography>
          </Button>
          <Button
            onClick={() =>
              navigate("/toppings", {
                state: { method: "see-more-details", item, currentUser },
              })
            }
            style={{
              backgroundColor: "gray",
              margin: 8,
            }}
          >
            <Typography style={{ fontSize: 12, color: "white" }}>
              my toppings
            </Typography>
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
