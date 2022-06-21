import { useState, useRef, useEffect } from "react";
import classes from "./styles.module.css";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import mergeImages from "merge-images";
import L4Image from "../../layers/l4/L4.png";
import { toPng } from "html-to-image";
import bgVideo from "../../assets/videos/bg-video.mp4";
import bgVideoMobile from "../../assets/videos/bg-video-mobile.mp4";
import card from "../card.module.scss";

// layers max value
const l1MaxImages = 3;
const l2MaxImages = 4;
const l3MaxImages = 3;

// max value of each dropdown
const gn1MaxValue = 49;
const gn2MaxValue = 49;
const gn3MaxValue = 49;
const gn4MaxValue = 49;

const Home = (props) => {
  // width
  const [width, setWidth] = useState(window.innerWidth);

  // dropdowns
  const [gn1, setGn1] = useState("");
  const [gn2, setGn2] = useState("");
  const [gn3, setGn3] = useState("");
  const [gn4, setGn4] = useState("");

  // booleans
  const isMobile = width <= 600;
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVideoShowing, setIsVideoShowing] = useState(false);
  const [isFinalPopupShowing, setIsFinalPopupShowing] = useState(false);

  // final data
  const [finalImage, setFinalImage] = useState("");

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  // add event listener
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  // display popup after 3s
  useEffect(() => {
    let timeout;
    if (isVideoShowing) {
      timeout = setTimeout(() => {
        setIsFinalPopupShowing(true);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isVideoShowing]);

  // refs
  const video = useRef();

  // set dropdown values
  const handleGn1 = (event) => {
    setGn1(event.target.value);
  };

  const handleGn2 = (event) => {
    setGn2(event.target.value);
  };

  const handleGn3 = (event) => {
    setGn3(event.target.value);
  };

  const handleGn4 = (event) => {
    setGn4(event.target.value);
  };

  // generate random number
  const getRandomNumber = (max, min = 1) => {
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    return formatNumber(number);
  };

  // add zero if number is less than 9
  const formatNumber = (number) => {
    return number <= 9 ? "0" + number : number;
  };

  // play bg video
  const playVideo = () => {
    video.current && video.current.play();
  };

  // close video, popup & reset everything
  const closePopup = () => {
    setIsVideoShowing(false);
    setIsFinalPopupShowing(false);
    setFinalImage("");
    setGn1("");
    setGn2("");
    setGn3("");
    setGn4("");
  };

  // merge layers
  const mergeLayers = async () => {
    // create random numbers
    let l1Val = getRandomNumber(l1MaxImages);
    let l2Val = getRandomNumber(l2MaxImages);
    let l3Val = getRandomNumber(l3MaxImages);

    // get images
    const L1Image = require("../../layers/l1/L1_" + l1Val + ".png");
    const L2Image = require("../../layers/l2/L2_" + l2Val + ".png");
    const L3Image = require("../../layers/l3/L3_" + l3Val + ".png");

    // create html elements using dropdown values

    let gn1Element = document.createElement("div");
    gn1Element.innerHTML = formatNumber(gn1);
    gn1Element.setAttribute(
      "style",
      `font-size:60px;overflow: hidden;height: 0;`
    );
    document.body.appendChild(gn1Element);

    let gn2Element = document.createElement("div");
    gn2Element.innerHTML = formatNumber(gn2);
    gn2Element.setAttribute(
      "style",
      `font-size:60px;overflow: hidden;height: 0;`
    );
    document.body.appendChild(gn2Element);

    let gn3Element = document.createElement("div");
    gn3Element.innerHTML = formatNumber(gn3);
    gn3Element.setAttribute(
      "style",
      `font-size:60px;overflow: hidden;height: 0;`
    );
    document.body.appendChild(gn3Element);

    let gn4Element = document.createElement("div");
    gn4Element.innerHTML = formatNumber(gn4);
    gn4Element.setAttribute(
      "style",
      `font-size:60px;overflow: hidden;height: 0;`
    );
    document.body.appendChild(gn4Element);

    try {
      setIsGenerating(true);
      // create images using html elements
      let pngStyles = {
        cacheBust: true,
        width: 75,
        height: 75,
        canvasWidth: 75,
        canvasHeight: 75,
        pixelRatio: 1,
      };
      let gn1Image = await toPng(gn1Element, pngStyles);
      let gn2Image = await toPng(gn2Element, pngStyles);
      let gn3Image = await toPng(gn3Element, pngStyles);
      let gn4Image = await toPng(gn4Element, pngStyles);

      // merge all images
      if (
        L1Image &&
        L2Image &&
        L3Image &&
        gn1Image &&
        gn2Image &&
        gn3Image &&
        gn4Image
      ) {
        let b64 = await mergeImages([
          L1Image,
          L2Image,
          L3Image,
          L4Image,
          { src: gn1Image, x: 150, y: 150 },
          { src: gn2Image, x: 320, y: 250 },
          { src: gn3Image, x: 610, y: 250 },
          { src: gn4Image, x: 785, y: 150 },
        ]);
        setIsGenerating(false);
        // final image
        console.log(b64);
        setFinalImage(b64);
        // metadata
        let l1metaData = "L1_" + l1Val + ".png";
        let l2metaData = "L2_" + l2Val + ".png";
        let l3metaData = "L3_" + l3Val + ".png";
        console.log(l1metaData);
        console.log(l2metaData);
        console.log(l3metaData);
        // do verification - send the image & the metadata to the server
        // if verified
        if (b64) {
          setIsVideoShowing(true);
          playVideo();
        } else {
          // show some error message
        }
      } else {
        // show some error message
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* video */}
      <div className={"frame " + classes.VideoWrapper}>
        <video
          className={`${classes.Video} ${isVideoShowing && classes.ShowVideo}`}
          muted
          ref={video}
          playsInline
          autoPlay
        >
          <source src={!isMobile ? bgVideo : bgVideoMobile} type="video/mp4" />
        </video>
        {isVideoShowing && isFinalPopupShowing && (
          <div className={classes.finalImageWrapper}>
            <div className={`${card.card} ${card.animated}`}>
              <img src={finalImage} alt="final" />
            </div>
            <Button variant="contained" onClick={closePopup}>
              Confirm
            </Button>
          </div>
        )}
      </div>
      {!isVideoShowing && (
        <div className={"frame " + classes.MainWrapper}>
          <div className={classes.GnMainWrapper}>
            <div className={classes.GnWrapper}>
              {/* dropdown 1 */}
              <FormControl
                sx={{ minWidth: 150 }}
                size="small"
                className={classes.GnLeft}
              >
                <InputLabel shrink>GN1</InputLabel>
                <Select
                  sx={[
                    {
                      legend: {
                        maxWidth: "100%",
                      },
                    },
                  ]}
                  value={gn1}
                  label="GN1"
                  onChange={handleGn1}
                  native
                >
                  <option value="">Select</option>
                  {Array.from(Array(gn1MaxValue + 1), (e, i) => {
                    return (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>

              {/* dropdown 2 */}
              <FormControl
                sx={{ minWidth: 150 }}
                size="small"
                className={classes.GnRight}
              >
                <InputLabel shrink>GN2</InputLabel>
                <Select
                  sx={[
                    {
                      legend: {
                        maxWidth: "100%",
                      },
                    },
                  ]}
                  value={gn2}
                  label="GN2"
                  onChange={handleGn2}
                  native
                >
                  <option value="">Select</option>
                  {Array.from(Array(gn2MaxValue + 1), (e, i) => {
                    return (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div className={classes.GnWrapper}>
              {/* dropdown 3 */}
              <FormControl
                sx={{ minWidth: 150 }}
                size="small"
                className={classes.GnLeft}
              >
                <InputLabel shrink>GN3</InputLabel>
                <Select
                  sx={[
                    {
                      legend: {
                        maxWidth: "100%",
                      },
                    },
                  ]}
                  value={gn3}
                  label="GN3"
                  onChange={handleGn3}
                  native
                >
                  <option value="">Select</option>
                  {Array.from(Array(gn3MaxValue + 1), (e, i) => {
                    return (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>

              {/* dropdown 4 */}
              <FormControl
                sx={{ minWidth: 150 }}
                size="small"
                className={classes.GnRight}
              >
                <InputLabel shrink>GN4</InputLabel>
                <Select
                  sx={[
                    {
                      legend: {
                        maxWidth: "100%",
                      },
                    },
                  ]}
                  value={gn4}
                  label="GN4"
                  onChange={handleGn4}
                  native
                >
                  <option value="">Select</option>
                  {Array.from(Array(gn4MaxValue + 1), (e, i) => {
                    return (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            {/* button */}
            <div className={classes.ButtonWrapper}>
              <Button
                variant="contained"
                disabled={
                  gn1.toString() === "" ||
                  gn2.toString() === "" ||
                  gn3.toString() === "" ||
                  gn4.toString() === "" ||
                  isGenerating
                }
                onClick={mergeLayers}
              >
                {!isGenerating ? "Confirm" : "Generating"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
