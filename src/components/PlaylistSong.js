import React, { useState, useEffect } from "react";
import { IoPlaySharp, IoEllipsisVertical } from "react-icons/io5";

const PlaylistSong = (props) => {
  const [hoverState, setHoverState] = useState(false);
  const [albumArtPath, setAlbumArtPath] = useState("");
  const [length, setLength] = useState("0:00");

  let songLength = props.song.track_length;
  let minutes = Math.floor(songLength / 60);
  let seconds = songLength - minutes * 60;

  useEffect(() => {
    let songRow = document.getElementById(`song${props.song.orderID}`);
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
        <img src={albumArtPath} style={{ width: "60px", height: "60px" }}></img>
      );
    }
  };

  const checkHovered = () => {
    if (
      hoverState ||
      parseInt(props.clickedOrderID) === parseInt(props.song.orderID)
    ) {
      return (
        <div
          className="playButtonContPlaylistSongRow"
          onClick={() => {
            props.playSong(
              props.song.song_id,
              props.song.path,
              props.song.album_art_path,
              props.song.song_name,
              props.song.track_length,
              "Elliot Smith",
              props.playlistid,
              props.song.orderID
            );
            filterSongs(props.playlistSongs);
          }}
        >
          <IoPlaySharp className="playButtonPlaylistSongRow" />
        </div>
      );
    } else return props.index + 1;
  };

  const checkClicked = () => {
    if (props.showMenu) {
      if (parseInt(props.clickedOrderID) === parseInt(props.song.orderID)) {
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

  useEffect(() => {
    if (props.song.track_length) {
      setLength(timeConverter(props.song.track_length));
    }
  }, [props.song?.track_length]);

  const timeConverter = (seconds) => {
    let time = new Date(seconds * 1000).toISOString().substr(14, 5);
    time = time.split("");
    if (time[0] === "0") {
      time.splice(0, 1);
    }
    time.join();
    return time;
  };

  const filterSongs = (songs) => {
    props.resetAutoQueue();
    let temp = [];
    songs.forEach((song) => {
      if (song.orderID != props.song.orderID) {
        let line = {
          albumID: song.albumID,
          albumartpath: song.album_art_path,
          orderID: song.orderID,
          songpath: song.path,
          playlistID: song.playlistID,
          songID: song.song_ID,
          songtitle: song.song_name,
          tracklength: song.track_length,
          artistname: "Elliot Smith",
        };
        temp.push(line);
      }
    });
    props.pushAutoQueue(temp);
  };

  return (
    <div
      className="playlistSongRow"
      id={`song${props.song.orderID}`}
      style={checkClicked()}
      songid={props.song.song_ID}
      orderid={props.song.orderID}
      albumid={props.song.albumID}
      song={props.song}
      songpath={props.song.path}
      albumartpath={props.song.album_art_path}
      songtitle={props.song.song_name}
      tracklength={props.song.track_length}
      playlistid={props.song.playlistID}
      artistname={"Elliot Smith"}
    >
      <div className="playlistSongNum">{checkHovered()}</div>
      <div className="playlistSongTitleCol">
        <div className="playlistSongImg">{checkImg()}</div>
        <div className="playlistSongTitleText">
          <div className="playlistSongTitle">
            <p>{props.song.song_name}</p>
          </div>
          <div className="playlistSongRowArtistName">
            <p>Elliot Smith</p>
          </div>
        </div>
      </div>
      <div className="playlistSongLength">{length}</div>
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
  );
};

export default PlaylistSong;
