import { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import "tachyons";
import ParticlesBg from "particles-bg";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "281642c988874866a01294b2099a4f97",
});

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onInputChange = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    console.log("submit");
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      (response) => {
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        );
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <div className="App">
      <ParticlesBg type="cobweb" color="#ffffff" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
