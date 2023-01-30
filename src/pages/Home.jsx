import { Box, Button, FormControl, OutlinedInput } from "@mui/material";
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
        height: "100vh",
        backgroundColor: "white",
        // "&:hover": {
        //   backgroundColor: "primary.main",
        //   opacity: [0.9, 0.8, 0.7],
        // },
      }}
    >
      <p>Cafe Latino</p>
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
    </Box>
  );
};

export default Home;
