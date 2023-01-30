import { Box, Button, FormControl, OutlinedInput } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Auth = ({ handleGetUserData, navigate }) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const handleUserInfo = (e, type) => {
    const temp = { ...userInfo };
    temp[type] = e.target.value;
    setUserInfo(temp);
  };

  const handleSignup = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/users", {
        ...userInfo,
      });

      localStorage.setItem("user_id", data.id);
      handleGetUserData(data);
      navigate("/menu");
    } catch (error) {
      alert("Sorry, something went wrong!");
    }
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
          placeholder="Username"
          onChange={(e) => handleUserInfo(e, "username")}
        />
        <OutlinedInput
          placeholder="Password"
          onChange={(e) => handleUserInfo(e, "password")}
        />
        <Button onClick={handleSignup}>Create</Button>
        <Button onClick={() => navigate("/")}>Back</Button>
      </FormControl>
    </Box>
  );
};

export default Auth;
