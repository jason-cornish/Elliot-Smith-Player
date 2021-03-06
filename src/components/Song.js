import React, { useState, useEffect } from "react";
import Heart from "../media/Heart.svg";
import HeartEmpty from "../media/HeartEmpty.svg";
import {
  IoPlaySharp,
  IoHeartOutline,
  IoEllipsisVertical,
} from "react-icons/io5";

const handleLikeSong = (id) => {};

const checkLiked = (props) => {
  if (props.likedSongs.includes(props.song.song_id)) return Heart;
  else return HeartEmpty;
};

const Song = (props) => {
  const [hoverState, setHoverState] = useState(false);

  const [albumArtPath, setAlbumArtPath] = useState("");

  useEffect(() => {
    let songRow = document.getElementById(`song${props.song.song_id}`);
    songRow.addEventListener("mouseenter", () => {
      setHoverState(true);
    });
    songRow.addEventListener("mouseleave", () => {
      setHoverState(false);
    });
    return () => {
      songRow.removeEventListener("mouseenter", () => {
        setHoverState(true);
      });
      songRow.removeEventListener("mouseleave", () => {
        setHoverState(false);
      });
    };
  });

  useEffect(() => {
    if (props.song.album_art_path) {
      async function importFile() {
        const file = await import(`../media/${props.song.album_art_path}.jpg`);
        setAlbumArtPath(file.default);
      }
      importFile();
    }
  }, [props.song.album_art_path]);

  const checkImg = () => {
    if (albumArtPath) {
      return (
        <img
          className="songImg"
          src={albumArtPath}
          style={
            hoverState ? { backgroundColor: "##e0e0e0", opacity: "70%" } : {}
          }
        ></img>
      );
    }
  };

  const checkClicked = () => {
    if (props.showMenu) {
      if (parseInt(props.songID) === parseInt(props.song.song_id)) {
        return {
          backgroundColor: "#0c1736",
        };
      } else {
        return {
          backgroundColor: "transparent",
        };
      }
    }
  };

  const checkHovered = () => {
    if (hoverState) {
      return (
        <div
          className="playButtonContSongRow"
          onClick={() =>
            props.playSong(
              props.song.song_id,
              props.song.path,
              props.song.album_art_path,
              props.song.song_name,
              props.song.track_length,
              "Elliot Smith"
            )
          }
        >
          <IoPlaySharp
            className="playButtonSongRow"
            style={{ opacity: "100%" }}
          />
        </div>
      );
    } else return <div></div>;
  };

  return (
    <div
      className="songRow"
      id={`song${props.song.song_id}`}
      albumid={props.song.albumID}
      style={checkClicked()}
      songpath={props.song.path}
      albumartpath={props.song.album_art_path}
      songtitle={props.song.song_name}
      tracklength={props.song.track_length}
      artistname={"Elliot Smith"}
    >
      <div className="songRowLeft">
        <div className="songImgCol">
          {checkHovered()}
          {checkImg()}
        </div>

        <div className="songInfoCol">
          <h1>{props.song.song_name}</h1>
          <p>Elliot Smith</p>
        </div>
      </div>
      <div className="likeSongCol">
        {/* <IoHeartOutline
          id="likeSong"
          src={checkLiked(props)}
          onClick={(props) => {
            handleLikeSong(props);
          }}
        ></IoHeartOutline> */}
        <IoEllipsisVertical
          className="visibleContextMenu"
          style={{
            width: "30px",
            height: "30px",
            fill: "white",
            cursor: "pointer",
          }}
        ></IoEllipsisVertical>
      </div>
    </div>
  );
};

export default Song;
