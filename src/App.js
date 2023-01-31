import "./App.css";

import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./pages/Nav";
import About from "./pages/About";
import Coffees from "./pages/Coffees";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import Auth from "./pages/Auth";
import Order from "./pages/Order";
import axios from "axios";
import Toppings from "./pages/Toppings";
import Feedback from "./pages/Feedback";

function App() {
  const navigate = useNavigate();
  const [coffees, setCoffees] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkUserSession = async () => {
    try {
      const user_id = localStorage.getItem("user_id");

      if (!user_id) return;
      const { data } = await axios.get(
        `http://localhost:8000/me/?user_id=${user_id}`
      );
      setIsAuthenticated(true);
      setCurrentUser(data);
      await getUserMenu();
      navigate("/menu");
    } catch (error) {
      alert("Sorry, something went wrong!");
    }
  };

  const getUserMenu = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/user/coffees`);
      setCoffees(data);
    } catch (error) {
      alert("Sorry, something went wrong!");
    }
  };

  const handleAddCoffee = async (payload) => {
    try {
      const { data } = await axios.post("http://localhost:8000/user/coffees", {
        ...payload,
      });
      setCoffees(data);
    } catch (error) {
      alert("Sorry, something went wrong!");
    }
  };

  const handleDeleteCoffee = async (id) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/user/coffees/remove",
        { id }
      );
      setCoffees(data);
      console.log("[debug]", data, "deleted data");
    } catch (error) {
      alert("Sorry, something went wrong!");
    }
  };

  const handleAddTopping = async (payload) => {
    try {
      await axios.post("http://localhost:8000/topping", { ...payload });
      await checkUserSession();
    } catch (error) {
      alert("Sorry, something went wrong!");
    }
  };

  const handleAddFeedback = async (payload) => {
    try {
      await axios.post("http://localhost:8000/feedbacks", {
        ...payload,
        user_id: currentUser?.id,
      });
      await checkUserSession();
    } catch (error) {
      alert("Sorry, something went wrong!");
    }
  };

  const handleEditProduct = async (product) => {
    try {
      const { data } = await axios.put("http://localhost:8000/user/coffees", {
        ...product,
      });
      setCoffees(data);
    } catch (error) {
      alert("Sorry, something went wrong!");
    }
  };
  useEffect(() => {
    checkUserSession();
  }, []);

  const handleGetUserData = async (user) => {
    setCurrentUser(user);
    await getUserMenu();
    setIsAuthenticated(true);
  };

  function logout() {
    sessionStorage.clear();
    setIsAuthenticated(false);
    setCurrentUser({});
    setCoffees([]);
  }

  return (
    <div className="App">
      <Nav
        currentUser={currentUser}
        navigate={navigate}
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              isAuthenticated={isAuthenticated}
              handleGetUserData={handleGetUserData}
              navigate={navigate}
            />
          }
        />
        <Route
          exact
          path="/order"
          element={
            <Order
              navigate={navigate}
              handleAddCoffee={handleAddCoffee}
              handleEditProduct={handleEditProduct}
              currentUser={currentUser}
            />
          }
        />
        <Route exact path="/about" element={<About />} />
        <Route
          exact
          path="/menu"
          element={
            <Coffees
              currentUser={currentUser}
              isAuthenticated={isAuthenticated}
              handleDeleteCoffee={handleDeleteCoffee}
              coffees={coffees}
              navigate={navigate}
            />
          }
        />
        <Route
          exact
          path="/topping"
          element={
            <Toppings
              handleAddTopping={handleAddTopping}
              isAuthenticated={isAuthenticated}
              navigate={navigate}
            />
          }
        />
        <Route
          exact
          path="/feedbacks"
          element={
            <Feedback
              handleAddFeedback={handleAddFeedback}
              isAuthenticated={isAuthenticated}
              navigate={navigate}
            />
          }
        />
        <Route exact path="/contact" element={<Contact />} />
        <Route
          exact
          path="/authentication"
          element={
            <Auth handleGetUserData={handleGetUserData} navigate={navigate} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
