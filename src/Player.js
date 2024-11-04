import {useEffect, useRef, useState} from "react";
import "./Player.css"

/**
 *
 * @param configure PlayerConfigure
 * @returns {JSX.Element}
 * @constructor
 */

function Player({configure}) {
    const audioPlayer = useRef(new Audio(configure.audioPath));
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // 判断是否加载成功
        audioPlayer.current.addEventListener("error", () => {
            alert("加载音频失败");
        })
        audioPlayer.current.load();
    }, [])

    function play_audio() {
        audioPlayer.current.play();
        setIsPlaying(true);
    }

    function pause_audio() {
        audioPlayer.current.pause();
        setIsPlaying(false);
    }

    const playerStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: configure.width,
        height: configure.height,
    }

    const backgroundImageStyle = {
        backgroundImage: `url(${configure.coverPath})`,
        backgroundSize: "100% 100%",
        filter: "blur(60px)",

        position: "absolute",
        top: 0,
        left: 0,

        width:  configure.width,
        height: configure.height,
    }

    return (
        <div style={playerStyle}>
            <div style={backgroundImageStyle}></div>
            <button className="play-button" onClick={() => {
                if (isPlaying) pause_audio();
                else play_audio();
            }}>{isPlaying ? "Pause" : "Play"}</button>
        </div>
    )
}

export default Player;
