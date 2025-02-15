import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { AiOutlineDown } from "react-icons/ai";
import Faisla from "../../images/Faisla.jpg";
import AudioPlayer from "../songComponents/AudioPlayer";
import InputBase from "@mui/material/InputBase";
import { BsDownload } from "react-icons/bs";
import User from "../../images/user.png";
import firebase from "../../firebase_config";
import dateFormat from "../utils/dateFormat";

const SongsPageMobile = () => {
  const isMobile = useMediaQuery({ maxWidth: "1200px" });

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      firebase.firestore().collection("songData").onSnapshot((snapshot) =>
        setSongs(snapshot.docs.map((doc) => doc.data()))
      );
    };
    getSongs();
  }, []);

  return songs.map((song) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* Song Yellow Box */}

        <div
          className="yellowBgBlur"
          style={{ transform: isMobile && "scale(0.6)" }}
        >
          <img alt="thumbnail" src={song.songPic} className="thumbnail" />
          <div
            style={{ height: "3px", width: "100%", background: "#757630" }}
          ></div>
          <div
            style={{
              height: "20%",
              width: "100%",
              padding: "1rem 0rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <AudioPlayer songAudio={song.songAudio} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="blackText" style={{ fontSize: "14px" }}>
                Released On
              </p>
              <p
                className="blackText"
                style={{ fontSize: "18px", marginTop: "5px" }}
              >
                {dateFormat(song.songDate.toDate())}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p className="blackText" style={{ fontSize: "14px" }}>
                Instrumental
              </p>
              <BsDownload size={20} style={{ margin: "5px 0 3px 0" }} />
            </div>
          </div>
        </div>

        {/* Song Yellow Box */}
        {/* Song Lyrics */}

        <div
          style={{
            height: isMobile ? "40vh" : "80vh",
            width: isMobile ? "90%" : "50%",
            padding: isMobile ? "0rem" : "2rem",
            display: "flex",
            flexDirection: "column",

            justifyContent: isMobile && "start",
          }}
        >
          <p className="yellowText" style={{ fontSize: isMobile && "60px" }}>
            {song.songName}
          </p>
          <div
            style={{
              height: "80%",
              width: "100%",
              background: "black",
              borderRadius: "15px",
              padding: "1rem",
              border: "2px solid white",
              overflow: "scroll",
            }}
          >
            <p
              className="whiteText"
              style={{ fontSize: "24px", width: "60%", lineHeight: "1.8" }}
            >
              {song.songLyrics}
            </p>
          </div>
        </div>

        {/* Song Lyrics */}
        {/* Song Comments */}

        <div
          style={{
            height: isMobile ? "30vh" : "30vh",
            width: "100%",

            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            padding: isMobile ? "2rem 1rem" : "1rem 2rem",
          }}
        >
          <p className="whiteText" style={{ fontSize: "25px" }}>
            Add a comment
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img
              alt="User Profile"
              src={User}
              style={{ width: isMobile ? "2rem" : "3rem" }}
            />

            <InputBase
              variant="standard"
              multiline
              style={{
                borderBottom: "2px solid white",
                width: "80%",
                margin: "0rem 1rem",
                color: "white",
              }}
            />
            <div
              className="yellowButton"
              style={{
                width: "15%",
                fontSize: isMobile ? "16px" : "24px",
                alignItems: "center",
                height: isMobile && "30px",
                borderRadius: isMobile && "10px",
              }}
            >
              Add
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <p
              className="normalText"
              style={{ fontSize: "16px", fontWeight: "bold" }}
            >
              View more comments
            </p>
            <AiOutlineDown
              size={20}
              color="white"
              style={{ margin: "0rem 0.5rem" }}
            />
          </div>
        </div>

        {/* Song Comments */}
      </div>
    );
  });
};

export default SongsPageMobile;
