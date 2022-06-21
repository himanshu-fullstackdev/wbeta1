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

// max value of each dropdown
const gn1MaxValue = 49;
const gn2MaxValue = 49;
const gn3MaxValue = 49;
const gn4MaxValue = 49;

const Home2 = (props) => {
  // width
  const [width, setWidth] = useState(window.innerWidth);

  // numbers
  const [gn1, setGn1] = useState(null);
  const [gn2, setGn2] = useState(null);
  const [gn3, setGn3] = useState(null);
  const [gn4, setGn4] = useState(null);

  // booleans
  const isMobile = width <= 600;
  const [isVideoShowing, setIsVideoShowing] = useState(false);
  const [isFinalPopupShowing, setIsFinalPopupShowing] = useState(false);

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
          autoPlay
        >
          <source src={!isMobile ? bgVideo : bgVideoMobile} type="video/mp4" />
        </video>
        {isVideoShowing && isFinalPopupShowing && (
          <div className={classes.finalImageWrapper}>
            <div className={classes.NumbersWrapper}>
              <div className={`${card.card} ${card.animated} ${classes.card}`}>
                <div className={classes.NumberWrapper}>
                  <img src={n1} alt="n1" />
                  <div className={classes.Number}>{gn1}</div>
                </div>
              </div>
              <div className={`${card.card} ${card.animated} ${classes.card}`}>
                <div className={classes.NumberWrapper}>
                  <img src={n2} alt="n2" />
                  <div className={classes.Number}>{gn2}</div>
                </div>
              </div>
              <div className={`${card.card} ${card.animated} ${classes.card}`}>
                <div className={classes.NumberWrapper}>
                  <img src={n3} alt="n3" />
                  <div className={classes.Number}>{gn3}</div>
                </div>
              </div>
              <div className={`${card.card} ${card.animated} ${classes.card}`}>
                <div className={classes.NumberWrapper}>
                  <img src={n4} alt="n4" />
                  <div className={classes.Number}>{gn4}</div>
                </div>
              </div>
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
