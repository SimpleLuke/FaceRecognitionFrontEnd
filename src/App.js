import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import "tachyons";
import ParticlesBg from "particles-bg";
// import Clarifai from "clarifai";

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace = [];
    data.outputs[0].data.regions.map((data) =>
      clarifaiFace.push(data.region_info.bounding_box)
    );
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    clarifaiFace.forEach((face) => {
      setBox((oldArray) => [
        ...oldArray,
        {
          leftCol: face.left_col * width,
          topRow: face.top_row * height,
          rightCol: width - face.right_col * width,
          bottomRow: height - face.bottom_row * height,
        },
      ]);
    });
  };

  // const displayFace = (data) => {
  //   setBox(data);
  // };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setBox([]);
    setImageUrl(input);
    console.log("submit");

    fetch("http://localhost:5000/imageUrl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:5000/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser((user) => {
                return { ...user, entries: count };
              });
            })
            .catch(console.log);
        }

        calculateFaceLocation(response);
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  };

  const onRouteChange = (route) => {
    if (route === "home") {
      setIsSignedIn(true);
    } else if (route === "signin") {
      setIsSignedIn(false);
      setImageUrl("");
    }
    setRoute(route);
  };
  return (
    <div className="App">
      <ParticlesBg type="cobweb" color="#ffffff" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <React.Fragment>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </React.Fragment>
      ) : route === "signin" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
};

export default App;
