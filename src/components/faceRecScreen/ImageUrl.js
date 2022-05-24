import { faceApiForUrl, faceApiForUpload } from "../../services/FaceApi";
import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { auth, storage } from "../../services/firebase";
import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

const ImageUrl = () => {
  const webcamRef = React.useRef(null);

  const [image, setImage] = useState("");
  const [outputImage, setOutputImage] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(data);
  }, [data]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    console.log(imageSrc);
  });

  const faceRectangleStyle = (item) => {
    return {
      position: "absolute",
      top: `${item.faceRectangle.top}px`,
      left: `${item.faceRectangle.left}px`,
      width: `${item.faceRectangle.width}px`,
      height: `${item.faceRectangle.height}px`,
      border: "2px solid #BA0B93",
      textAlign: "center",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
    };
  };
  const handleSubmit = async () => {
    var imgurl = "";
    // var imgname = auth.currentUser.email;
    var imgname = "test.jpeg";

    var imgref = ref(storage, imgname);

    await uploadString(imgref, image, "data_url")
      .then((snapshot) => {
        console.log("done");
      })
      .catch((error) => {
        console.log(error);
      });

    var imageurl = await getDownloadURL(imgref);

    try {
      console.log(imageurl);
      const response = await faceApiForUrl.post(`/face/v1.0/detect`, {
        url: imageurl,
      });
      setData(response.data);
      setOutputImage(true);
    } catch (err) {
      console.log(err.response.data);
      window.alert("An error occurred");
    }
  };
  const handleBack = () => {
    setOutputImage(false);
    setImage("");
  };
  return (
    <div>
      {!outputImage ? (
        <div>
          <div className="webcam-container">
            <div className="webcam-img">
              {image == "" ? (
                <Webcam
                  audio={false}
                  height={800}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={820}
                  videoConstraints={videoConstraints}
                />
              ) : (
                <img src={image} />
              )}
            </div>
            <div>
              {image != "" ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setImage("");
                  }}
                  className="webcam-btn"
                >
                  Retake Image
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    capture();
                  }}
                  className="webcam-btn"
                >
                  Capture
                </button>
              )}
            </div>
          </div>

          <button type="button" onClick={handleSubmit}>
            SUBMIT
          </button>
          <div style={{ position: "relative" }}>
            {/* <img src={image} alt="output" /><br /> */}
            {data &&
              data.map((item) => {
                return (
                  <div key={item.faceId} style={faceRectangleStyle(item)}></div>
                );
              })}
            <button type="button" onClick={handleBack}>
              BACK
            </button>

            {data.length > 0 ? (
              <div>
                {data.map((item) => {
                  return (
                    <div key={item.faceId}>
                      <p>Gender: {item.faceAttributes.gender}</p>
                      <p>Age: {item.faceAttributes.age}</p>
                      <p>Glasses: {item.faceAttributes.glasses}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No face detected</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <img src={image} alt="output" />
          <br />
          <button type="button" onClick={handleBack}>
            BACK
          </button>
        </div>
      )}
    </div>
  );
};
export default ImageUrl;
