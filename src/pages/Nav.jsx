import { Box, Button, Typography } from "@mui/material";
import React from "react";

const Nav = ({ currentUser, navigate, logout }) => {
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    logout();
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: 100,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
      }}
    >
      <Box>
        <Typography
          variant="h1"
          component="h2"
          style={{ color: "white", fontSize: 40 }}
        >
          {currentUser ? currentUser?.username : "no user!"}
        </Typography>
        {currentUser?.username && (
          <Button onClick={handleLogout}>
            <Typography style={{ color: "white" }}>Logout</Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Nav;
