import { useState, useRef, useEffect } from "react";
import classes from "./styles.module.css";
import Button from "@mui/material/Button";
import bgVideo from "../../assets/videos/bg-video.mp4";
import bgVideoMobile from "../../assets/videos/bg-video-mobile.mp4";
import n1 from "../../assets/images/n1.png";
import n2 from "../../assets/images/n2.png";
import n3 from "../../assets/images/n3.png";
import n4 from "../../assets/images/n4.png";
import card from "../card.module.scss";
import Confetti from "react-confetti";

// max value of each dropdown
const gn1MaxValue = 49;
const gn2MaxValue = 49;
const gn3MaxValue = 49;
const gn4MaxValue = 49;

// total video count
const totalVideoCount = 4;

const showAnimationAt = 3;
const showButtonAt = 5;

const Home2 = (props) => {
  // width
  const [width, setWidth] = useState(window.innerWidth);

  // numbers
  const [gn1, setGn1] = useState(null);
  const [gn2, setGn2] = useState(null);
  const [gn3, setGn3] = useState(null);
  const [gn4, setGn4] = useState(null);

  // video
  const [videoCount, setVideoCount] = useState(1);

  // booleans
  const isMobile = width <= 600;
  const [isVideoShowing, setIsVideoShowing] = useState(false);
  const [isFirstNumberShowing, setIsFirstNumberShowing] = useState(false);
  const [isSecondNumberShowing, setIsSecondNumberShowing] = useState(false);
  const [isThirdNumberShowing, setIsThirdNumberShowing] = useState(false);
  const [isFourthNumberShowing, setIsFourthNumberShowing] = useState(false);
  const [isButtonShowing, setIsButtonShowing] = useState(false);
  const [isConfettiShowing, setIsConfettiShowing] = useState(false);
  const [isReady, setIsReady] = useState(false);

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
  // useEffect(() => {
  //   let timeout1;
  //   let timeout2;
  //   let timeout3;
  //   let timeout4;
  //   let timeout5;
  //   if (isVideoShowing) {
  //     timeout1 = setTimeout(() => {
  //       setIsFirstNumberShowing(true);
  //     }, 3000);
  //     timeout2 = setTimeout(() => {
  //       setIsSecondNumberShowing(true);
  //     }, 8000);
  //     timeout3 = setTimeout(() => {
  //       setIsThirdNumberShowing(true);
  //     }, 13000);
  //     timeout4 = setTimeout(() => {
  //       setIsFourthNumberShowing(true);
  //     }, 18000);
  //     timeout5 = setTimeout(() => {
  //       setIsButtonShowing(true);
  //     }, 23000);
  //   }
  //   return () => {
  //     clearTimeout(timeout1);
  //     clearTimeout(timeout2);
  //     clearTimeout(timeout3);
  //     clearTimeout(timeout4);
  //     clearTimeout(timeout5);
  //   };
  // }, [isVideoShowing]);

  const handleOnTimeUpdate = () => {
    if (
      videoCount === 1 &&
      video.current.currentTime >= showAnimationAt &&
      !isFirstNumberShowing
    ) {
      setIsFirstNumberShowing(true);
    } else if (
      videoCount === 2 &&
      video.current.currentTime >= showAnimationAt &&
      !isSecondNumberShowing
    ) {
      setIsSecondNumberShowing(true);
    } else if (
      videoCount === 3 &&
      video.current.currentTime >= showAnimationAt &&
      !isThirdNumberShowing
    ) {
      setIsThirdNumberShowing(true);
    } else if (
      videoCount === 4 &&
      video.current.currentTime >= showAnimationAt &&
      !isFourthNumberShowing
    ) {
      setIsFourthNumberShowing(true);
      if (!isConfettiShowing) {
        setIsConfettiShowing(true);
      }
    } else if (
      isFirstNumberShowing &&
      isSecondNumberShowing &&
      isThirdNumberShowing &&
      isFourthNumberShowing &&
      video.current.currentTime >= showButtonAt
    ) {
      setIsButtonShowing(true);
    }
  };

  useEffect(() => {
    let timeout;
    if (isConfettiShowing) {
      timeout = setTimeout(() => {
        setIsConfettiShowing(false);
      }, 4000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isConfettiShowing]);

  // refs
  const video = useRef();

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

  // const handleOnCanPlayThrough = () => {
  //   console.log("handleOnCanPlayThrough");
  //   console.log(video.current.readyState);
  //   console.log(video);
  //   if (video.current && video.current.readyState === 4 && !isReady) {
  //     setIsReady(true);
  //   }
  // };

  const handleOnLoadedMetadata = () => {
    console.log("handleOnLoadedMetadata");
    console.log(video.current.readyState);
    if (video.current && video.current.readyState >= 1 && !isReady) {
      setIsReady(true);
    }
  };

  const handleVideoEnded = () => {
    if (videoCount < totalVideoCount) {
      playVideo();
      setVideoCount(videoCount + 1);
    }
  };

  // close video, popup & reset everything
  const closePopup = () => {
    setIsVideoShowing(false);
    setIsFirstNumberShowing(false);
    setIsSecondNumberShowing(false);
    setIsThirdNumberShowing(false);
    setIsFourthNumberShowing(false);
    setIsConfettiShowing(false);
    setIsButtonShowing(false);
    setVideoCount(1);
    setGn1("");
    setGn2("");
    setGn3("");
    setGn4("");
  };

  const showNumbers = () => {
    let l1Val = getRandomNumber(gn1MaxValue);
    let l2Val = getRandomNumber(gn2MaxValue);
    let l3Val = getRandomNumber(gn3MaxValue);
    let l4Val = getRandomNumber(gn4MaxValue);
    setGn1(l1Val);
    setGn2(l2Val);
    setGn3(l3Val);
    setGn4(l4Val);
    setIsVideoShowing(true);
    playVideo();
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
          // onLoad={handleVideoStart}
          onEnded={handleVideoEnded}
          // onCanPlayThrough={handleOnCanPlayThrough}
          onLoadedMetadata={handleOnLoadedMetadata}
          onTimeUpdate={handleOnTimeUpdate}
          preload="auto"
        >
          <source src={!isMobile ? bgVideo : bgVideoMobile} type="video/mp4" />
        </video>
        {isVideoShowing && (
          <div className={classes.finalImageWrapper}>
            <div className={classes.NumbersWrapper}>
              <div
                className={`${classes.NumberMainWrapper} ${
                  isFirstNumberShowing &&
                  `${classes.bounce} ${classes.ShowNumberMainWrapper}`
                }`}
              >
                <div
                  className={`${classes.card} ${
                    isFirstNumberShowing && `${card.card} ${card.animated}`
                  }`}
                >
                  <div className={classes.NumberWrapper}>
                    <img src={n1} alt="n1" />
                    <div className={classes.Number}>{gn1}</div>
                  </div>
                </div>
              </div>
              <div
                className={`${classes.NumberMainWrapper} ${
                  isSecondNumberShowing &&
                  `${classes.bounce} ${classes.ShowNumberMainWrapper}`
                }`}
              >
                <div
                  className={`${classes.card} ${
                    isSecondNumberShowing && `${card.card} ${card.animated}`
                  }`}
                >
                  <div className={classes.NumberWrapper}>
                    <img src={n2} alt="n2" />
                    <div className={classes.Number}>{gn2}</div>
                  </div>
                </div>
              </div>

              <div
                className={`${classes.NumberMainWrapper} ${
                  isThirdNumberShowing &&
                  `${classes.bounce} ${classes.ShowNumberMainWrapper}`
                }`}
              >
                <div
                  className={`${classes.card} ${
                    isThirdNumberShowing && `${card.card} ${card.animated}`
                  }`}
                >
                  <div className={classes.NumberWrapper}>
                    <img src={n3} alt="n3" />
                    <div className={classes.Number}>{gn3}</div>
                  </div>
                </div>
              </div>
              <div
                className={`${classes.NumberMainWrapper} ${
                  isFourthNumberShowing &&
                  `${classes.bounce} ${classes.ShowNumberMainWrapper}`
                }`}
              >
                <div
                  className={`${classes.card} ${
                    isFourthNumberShowing && `${card.card} ${card.animated}`
                  }`}
                >
                  <div className={classes.NumberWrapper}>
                    <img src={n4} alt="n4" />
                    <div className={classes.Number}>{gn4}</div>
                  </div>
                </div>
              </div>
              <div
                className={`${classes.ConfettiMainWrapper} ${
                  isConfettiShowing && `${classes.ShowConfettiMainWrapper}`
                }`}
              >
                <Confetti />
              </div>
            </div>
            <Button
              className={`${isButtonShowing && `${classes.showButton}`}`}
              variant="contained"
              onClick={closePopup}
            >
              Confirm
            </Button>
          </div>
        )}
      </div>

      {!isVideoShowing && isReady && (
        <div className={"frame " + classes.MainWrapper}>
          <div className={classes.GnMainWrapper}>
            {/* button */}
            <div className={classes.ButtonWrapper}>
              <Button variant="contained" onClick={showNumbers}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home2;
