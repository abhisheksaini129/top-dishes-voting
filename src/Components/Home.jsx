import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/Home.css";
const Home = () => {
  const [loginFlag, setLoginFlage] = useState(localStorage.getItem("login"));
  const [dishes, setdishes] = useState([]);
  const [topdishes, setTopDishes] = useState([]);
  const [currentRank, setCurrentRank] = useState(1);
  const [oldIndex, setOldIndex] = useState();
  const [activeClass, setActiveClass] = useState(" ");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"
      )
      .then(function (response) {
        // handle success
        setdishes(response.data);
      });
  }, []);

  ///this function is used for managing the top-dishes and display it to 2nd tab
  function handleTopDishes(event, dish) {
    event.preventDefault();
    if (topdishes.length >= 3) {
      alert("First remove item from top list");
    } else {
      setCurrentRank(currentRank + 1);
      let tempArr = [...topdishes];
      tempArr.push(dish);
      setTopDishes(tempArr);
    }
  }
  ///this function is used for removing items from top-dishes
  function handleRemove(id) {
    let tempArr = topdishes.filter((dish) => dish.id !== id);
    setCurrentRank(tempArr.length + 1);
    setTopDishes(tempArr);
  }
  ///this function is used for log-out your account
  function handleLogout() {
    setLoginFlage(false);
    localStorage.removeItem("login");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }
  ///this function is used for handling the rank changing process in top-dishes by user
  function handleRankchange(newIndex) {
    if (newIndex === oldIndex) {
      return;
    }
    let tempArr = [...topdishes];
    tempArr.splice(oldIndex, 1);
    tempArr.splice(newIndex, 0, topdishes[oldIndex]);
    setTopDishes(tempArr);
  }
  ///this function is used for activating modal for changing rank in top dihes 2nd tab
  function handleRank(oldIndex) {
    setActiveClass(" active");
    setOldIndex(oldIndex);
  }
  // for managing, unauthrized access without login details
  if (!loginFlag) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <>
      {loginFlag ? (
        <div className="home-container">
          <div className="dish-container alldish">
            {dishes.map((dish, id) => (
              <div key={id} className="dish">
                <img className="dish-img" src={dish.image} alt="dishImage" />
                <p className="dish-name">{dish.dishName}</p>
                <p className="dish-description">{dish.description}</p>
                <button
                  className="rank-button" onClick={(event) => handleTopDishes(event, dish)}
                >
                  ADD to Rank {currentRank}
                </button>
              </div>
            ))}
          </div>
          <div className="dish-container topdish">
            <p className="top-dish-head">TOP DISH IN CHART</p>
            {topdishes.map((dish, ind) => (
              <div key={ind} className="top-dish">
                <img
                  className="top-dish-img"
                  src={dish.image}
                  alt="dishImage"
                />
                <div className="data-container">
                  <p className="top-dish-name">{dish.dishName}</p>
                  <p className="top-dish-points"> {30 - 10 * ind} Points</p>
                </div>
                <div className="button-container">
                  <button
                    className="top-rank-button rankChange"
                    onClick={() => handleRank(ind)}
                  >
                    Change Rank {ind + 1}
                  </button>
                  <div
                    className={`changeRank-container${activeClass}`}
                    onClick={() => setActiveClass("")}
                  >
                    {topdishes.map((obj, id) => (
                      <button
                        key={id}
                        className="top-rank-button rankChanger"
                        onClick={() => handleRankchange(id)}
                      >
                        {" "}
                        Rank {id + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    className="top-rank-button rankDelete"
                    onClick={() => handleRemove(dish.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="logout-container">
            <button
              className="logout rank-button "
              onClick={() => {
                handleLogout();
              }}
            >
              {" "}
              LogOut{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className="login-message">
          <h1>You are not allowed to Access this page</h1>
          <h2>Redirecting, back to login Page...</h2>
        </div>
      )}
    </>
  );
};

export default Home;
