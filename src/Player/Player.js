import {useEffect, useRef, useState} from "react";
import "./Player.css"
import RecordCover from "./RecordCover";

/**
 *
 * @param configure PlayerConfigure
 * @param width
 * @param height
 * @returns {JSX.Element}
 * @constructor
 */

function Player({configure, width, height}) {
    const audioPlayer = useRef(new Audio(configure.audioPath));
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const timerInterval = useRef(null);

    useEffect(() => {
        // 判断是否加载成功
        audioPlayer.current.addEventListener("error", () => {
            alert("加载音频失败");
        })
        audioPlayer.current.loop = true;
        audioPlayer.current.load();

        return () => {

        }
    }, [])


    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setTimer(timer => timer + 50);
            }, 50);
            timerInterval.current = interval;

            return () => {
                clearInterval(interval);
            }
        } else {
            if (timerInterval.current) {
                clearInterval(timerInterval.current);
            }
        }
    }, [isPlaying])

    function play_audio() {
        audioPlayer.current.play();
        setIsPlaying(true);
    }

    function pause_audio() {
        audioPlayer.current.pause();
        setIsPlaying(false);
    }

    const recordSize = height * 0.4;
    const recordLeft = width * 0.5 - recordSize / 2;
    const recordTop  = height * 0.25 - recordSize / 2;
    const titleTop = height * 0.5;
    const subTitleTop = height * 0.5 + 50;

    return (
        <div
            style={{
                width: width,
                height: height,
            }}
            className="player"
        >
            <div
                style={{
                    backgroundImage: `url(${configure.coverPath})`,
                    width:  width,
                    height: height,
                }}
                className="background-image"
            />
            <RecordCover
                size= {recordSize}
                top = {recordTop}
                left= {recordLeft}
                imagePath = {configure.coverPath}
                timer = {timer}
                cycle = {configure.coverRotatingCycle}
            />
            <div
                style={{
                    top: titleTop
                }}
                className="title-text"
            >
                {configure.title}
            </div>
            <div
                style={{
                    top: subTitleTop
                }}
                className="subtitle-text"
            >
                {configure.subTitle}
            </div>
            <button className="play-button" onClick={() => {
                if (isPlaying) pause_audio();
                else play_audio();
            }}>{isPlaying ? "Pause" : "Play"}</button>
        </div>
    )
}

export default Player;
