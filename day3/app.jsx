const audios = [
  {
    id: 1,
    name: "Sao cũng được",
    singer: "Thành Đạt",
    src: "./audios/SaoCungDuoc_ThanhDat.mp3",
    thumbnail:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/a/6/5/5/a65573e6905dc4f29f59c49ea04866cf.jpg",
  },
  {
    id: 2,
    name: "Cưới hông chốt nha",
    singer: "Út Nhị Mino, Đỗ Thành Duy, NH4T",
    src: "./audios/CuoiHongChotNha_UtNhiMino.mp3",
    thumbnail:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/5/1/8/351803934294554997dea64d724efd51.jpg",
  },
  {
    id: 3,
    name: "Bài ngửa",
    singer: "Vương Anh Tú",
    src: "./audios/BaiNgua_VuongAnhTu.mp3",
    thumbnail:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/4/0/d/e/40dee59ca6ea3f25e654c8f94183884c.jpg",
  },
  {
    id: 4,
    name: "Có chơi có chịu",
    singer: "Karik, Only C",
    src: "./audios/CoChoiCoChiu_Karik.mp3",
    thumbnail:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/2/8/9/2/2892c3530e93895b6605cea040c749e0.jpg",
  },
  {
    id: 5,
    name: "Tòng phu",
    singer: "Keyo",
    src: "./audios/TongPhu_Keyo.mp3",
    thumbnail:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/d/f/9/b/df9b187a2b0e565ebe5b6bd60bdef622.jpg",
  },
];

function AudioVolume({ handleChangeVolume }) {
  const [volume, setVolume] = React.useState(100);

  const currVolume = React.useRef(volume);

  const handleVolume = (e) => {
    setVolume(e.target.value);
    currVolume.current = e.target.value;
    handleChangeVolume(e.target.value);
  };

  const handleToggleMuteVolume = () => {
    if (volume > 0) {
      setVolume(0);
      handleChangeVolume(0);
    } else {
      setVolume(Number(currVolume.current));
      handleChangeVolume(Number(currVolume.current));
    }
  };

  return (
    <div className="volume">
      <div className="icon-volume" onClick={handleToggleMuteVolume}>
        {Number(volume) === 0 ? (
          <i className="fa-solid fa-volume-xmark"></i>
        ) : Number(volume) < 70 ? (
          <i className="fa-solid fa-volume-low"></i>
        ) : (
          <i className="fa-solid fa-volume-high"></i>
        )}
      </div>

      <input
        type="range"
        id="volume"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolume}
      ></input>
    </div>
  );
}

function App() {
  const [audio, setAudio] = React.useState({
    index: 0,
    isPlay: false,
    currTime: 0,
  });
  const currVolume = React.useRef(100);

  React.useEffect(() => {
    audioMedia.addEventListener("loadedmetadata", () => {
      document.getElementById("track-length").textContent = convertTime(
        audioMedia.duration
      );
    });
  }, [audio.index]);

  React.useEffect(() => {
    const intervalID = setInterval(() => {
      if (audioMedia.currentTime === audioMedia.duration) {
        handleNextAudio();
      } else {
        document.getElementById("current-time").textContent = convertTime(
          audioMedia.currentTime
        );

        const sAreaWidth = document.getElementById("s-area").offsetWidth;
        document.getElementById("seek-bar").style.width =
          (audioMedia.currentTime / audioMedia.duration) * sAreaWidth + "px";
      }
    }, 1000);

    return function cleanup() {
      clearInterval(intervalID);
    };
  });

  const handlePrevAudio = () => {
    audioMedia.pause();
    setAudio((prevAudio) => ({
      ...prevAudio,
      index: prevAudio.index === 0 ? audios.length - 1 : prevAudio.index - 1,
      currTime: 0,
    }));
  };

  const handleNextAudio = () => {
    audioMedia.pause();
    setAudio((prevAudio) => ({
      ...prevAudio,
      index: prevAudio.index === audios.length - 1 ? 0 : prevAudio.index + 1,
      currTime: 0,
    }));
  };

  const handleSeekAudio = (e) => {
    audioMedia.pause();

    const sAreaEle = document.getElementById("s-area");

    const sAreaEleWidth = sAreaEle.offsetWidth;
    const sAreaEleOffsetLeft = sAreaEle.getBoundingClientRect().left;
    const mouseOffsetLeft = e.clientX;

    const currTime =
      ((mouseOffsetLeft - sAreaEleOffsetLeft) / sAreaEleWidth) *
      audioMedia.duration;

    document.getElementById("seek-bar").style.width =
      (currTime / audioMedia.duration) * sAreaEleWidth + "px";

    setAudio((prevAudio) => ({
      ...prevAudio,
      currTime: currTime,
    }));
  };

  const handleMouseMoveSeekBar = (e) => {
    const sAreaEle = document.getElementById("s-area");

    const sAreaEleWidth = sAreaEle.offsetWidth;
    const sAreaEleOffsetLeft = sAreaEle.getBoundingClientRect().left;
    const mouseOffsetLeft = e.clientX;

    document.getElementById("s-hover").style.width =
      mouseOffsetLeft - sAreaEleOffsetLeft + "px";

    const currTime =
      ((mouseOffsetLeft - sAreaEleOffsetLeft) / sAreaEleWidth) *
      audioMedia.duration;
    const insTimeEle = document.getElementById("ins-time");
    insTimeEle.textContent = convertTime(currTime);
    insTimeEle.style.left = mouseOffsetLeft - sAreaEleOffsetLeft - 24 + "px";
    insTimeEle.style.display = "block";
    insTimeEle.style.display = "block";
  };

  const handleMouseOutSeekBar = (e) => {
    document.getElementById("s-hover").style.width = "0";
    document.getElementById("ins-time").style.display = "none";
  };

  const handleChangeVolume = (volume) => {
    currVolume.current = volume;
    audioMedia.volume = currVolume.current / 100;
  };

  const handlePlayPauseAudio = () => {
    if (audio.isPlay) {
      audioMedia.pause();
      setAudio((prevAudio) => ({
        ...prevAudio,
        isPlay: !prevAudio.isPlay,
        currTime: audioMedia.currentTime,
      }));
    } else {
      setAudio((prevAudio) => ({
        ...prevAudio,
        isPlay: !prevAudio.isPlay,
      }));
    }
  };

  const convertTime = (seconds) => {
    try {
      const result = new Date(seconds * 1000).toISOString().substring(14, 19);
      return result;
    } catch {
      // do nothing
    }
  };

  const { name, singer, thumbnail } = audios[audio.index];
  const audioMedia = new Audio(audios[audio.index].src);
  audioMedia.volume = currVolume.current / 100;
  audioMedia.currentTime = audio.currTime;
  audio.isPlay ? audioMedia.play() : "";

  return (
    <>
      <div id="player-track" className={audio.isPlay ? "active" : ""}>
        <div id="album-name">{name}</div>
        <div id="track-name">{singer}</div>
        <div id="track-time" className={audio.isPlay ? "active" : ""}>
          <div id="current-time">
            {audioMedia.currentTime ? convertTime(audioMedia.currentTime) : ""}
          </div>
          <div id="track-length"></div>
        </div>
        <div
          id="s-area"
          onClick={handleSeekAudio}
          onMouseMove={handleMouseMoveSeekBar}
          onMouseOut={handleMouseOutSeekBar}
        >
          <div id="ins-time"></div>
          <div id="s-hover"></div>
          <div id="seek-bar"></div>
        </div>
      </div>

      <div id="player-content">
        <div id="album-art" className={audio.isPlay ? "active" : ""}>
          <img src={thumbnail} className={audio.isPlay ? "active" : ""} />
          <div id="buffer-box">Buffering ...</div>
        </div>
        <div id="player-controls">
          <div className="control" onClick={handlePrevAudio}>
            <div className="button" id="play-previous">
              <i className="fas fa-backward"></i>
            </div>
          </div>
          <div className="control" onClick={handlePlayPauseAudio}>
            <div className="button" id="play-pause-button">
              {audio.isPlay || <i className="fas fa-play"></i>}
              {audio.isPlay && <i className="fas fa-pause"></i>}
            </div>
          </div>
          <div className="control" onClick={handleNextAudio}>
            <div className="button" id="play-next">
              <i className="fas fa-forward"></i>
            </div>
          </div>
          <AudioVolume handleChangeVolume={handleChangeVolume} />
        </div>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("player"));
root.render(<App />);
