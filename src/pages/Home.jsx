import { Box, Button, FormControl, OutlinedInput, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Home = ({ handleGetUserData, navigate }) => {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  const handleUserInfo = (e, type) => {
    const temp = { ...userInfo };
    temp[type] = e.target.value;
    setUserInfo(temp);
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/login", {
        ...userInfo,
      });

      console.log("[debug]", data, "data");
      localStorage.setItem("user_id", data.id);
      handleGetUserData(data);
      navigate("/menu");
    } catch (error) {
      alert("Please create a account!");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "30vh",
        backgroundColor: "white",
      }}
    >
      <FormControl sx={{ width: "25ch" }}>
        <OutlinedInput
          placeholder="username"
          onChange={(e) => handleUserInfo(e, "username")}
        />
        <OutlinedInput
          placeholder="Password"
          onChange={(e) => handleUserInfo(e, "password")}
        />
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={() => navigate("/authentication")}>Sign-up</Button>
      </FormControl>
      <Box
      sx={{
        width: "100vw",
        height: "80vh",
        backgroundColor: "black",
      }}
    >
      <Typography style={{color: 'white', fontSize: 40}}>
        Welcome to coffee maker!
      </Typography>
      <Typography style={{color: 'tomato', fontSize: 40}}>
        Where you get to create your coffee for the world to see!
      </Typography>
      </Box>
    </Box>
  );
};

export default Home;
