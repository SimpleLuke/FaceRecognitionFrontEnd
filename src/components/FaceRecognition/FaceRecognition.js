import "./FaceRecognition.css";
const FaceRecognition = ({ imageUrl, box }) => {
  console.log(box);
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
        {box.map((frame) => (
          <div
            className="bounding-box"
            style={{
              top: frame.topRow,
              right: frame.rightCol,
              bottom: frame.bottomRow,
              left: frame.leftCol,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
