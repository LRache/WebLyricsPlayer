import {useEffect, useRef, useState} from "react";
import "./Player.css"
import RecordCover from "./RecordCover";
import {LyricsBlock} from "./LyricsBlock";

export const LYRICS_TEXT_POSITION = [
    [
        "18vh",
        "26vh",
        "34vh",
        "42vh",
        "50vh",
        "58vh",
        "66vh",
        "74vh",
        "82vh",
    ],
    [
        "14vh",
        "26vh",
        "38vh",
        "50vh",
        "62vh",
        "74vh",
        "86vh",
    ]
]

function Player({configure, width, height, ready}) {
    const audioPlayer = useRef(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);

    // Timer
    const [timer, setTimer] = useState(0);
    const timerInterval = useRef(null);
    const nextTriggerTime = useRef(-1);

    // lyrics
    const lyricsTextPosition = useRef([]);
    const currentLyricsIndex = useRef(-1);
    const lyricsTextList  = useRef([]);
    const [lyricsBlockList, setLyricsBlockList] = useState([]);

    function update_lyrics_block() {
        let nextLyricsBlockList = [];
        const lyricsCount = configure.BottomLyricsCount + configure.TopLyricsCount + 1;
        const topLyricsIndex = currentLyricsIndex.current - configure.TopLyricsCount;
        if (topLyricsIndex - 1 >= 0) {
            nextLyricsBlockList.push(
                <LyricsBlock
                    text ={lyricsTextList.current[topLyricsIndex - 1].text}
                    top = {lyricsTextPosition.current[0]}
                    selected = {false}
                    exit = {true}
                    key = {topLyricsIndex - 1}
                />
            )
        }
        for (let i = 0; i < lyricsCount; i++) {
            const index = topLyricsIndex + i;
            if (index >= 0 && index < lyricsTextList.current.length) {
                const lyricsText = lyricsTextList.current[index].text;
                nextLyricsBlockList.push(
                    <LyricsBlock
                        text = {lyricsText}
                        top  = {lyricsTextPosition.current[i]}
                        selected = {index === currentLyricsIndex.current}
                        exit = {false}
                        key = {index}
                    />
                )
            }
        }
        setLyricsBlockList(nextLyricsBlockList.reverse());
    }

    function play_audio() {
        // if (audioPlayer.current.readyState !== 4) {
        //     alert("音频加载中，请稍后再试");
        //     return;
        // }
        audioPlayer.current.play();
        setIsPlaying(true);
    }

    function pause_audio() {
        audioPlayer.current.pause();
        setIsPlaying(false);
    }

    function reset() {
        setTimer(0);
        currentLyricsIndex.current = -1;
        nextTriggerTime.current = lyricsTextList.current[0].time;
        update_lyrics_block();
    }

    function audio_ended() {
        audioPlayer.current.pause();
        setIsPlaying(false);
        clearInterval(timerInterval.current);
        reset();
    }

    function load_lyrics() {
        lyricsTextList.current = configure.lyricsText.split("\n").map((line) => {
            const time = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/);
            if (time) {
                const minutes = parseInt(time[1]);
                const seconds = parseInt(time[2]);
                const milliseconds = time[3].length === 3 ? parseInt(time[3]) : parseInt(time[3]) * 10;
                const text = line.replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/, "");
                let ms = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
                const left = ms % 30;
                if (left <= 15) {
                    ms -= left;
                } else {
                    ms += 30 - left;
                }
                return {
                    time: ms,
                    text: text.replaceAll("\\n", "\n")
                }
            }
            return null;
        })
        lyricsTextList.current = lyricsTextList.current.filter((lyrics) => lyrics !== null);
        if (lyricsTextList.current.length === 0) {
            nextTriggerTime.current = -1;
        } else {
            nextTriggerTime.current = lyricsTextList.current[0].time;
        }
        currentLyricsIndex.current = -1;

        lyricsTextPosition.current = configure.lyricsTextPosition;

        update_lyrics_block();
    }

    function load_audio() {
        audioPlayer.current.src = configure.audioPath;
        audioPlayer.current.preload = "auto";
        audioPlayer.current.load();
    }

    useEffect(() => {
        // 判断是否加载成功
        audioPlayer.current.addEventListener("error", () => {
            alert("加载音频失败");
        })
        audioPlayer.current.addEventListener("ended", audio_ended);
    }, [])

    useEffect(() => {
        if (ready) {
            load_lyrics();
            load_audio();
        }
    }, [ready]);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setTimer(timer => timer + 30);
            }, 30);
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

    useEffect(() => {
        update_lyrics_block();
    }, [width, height])

    useEffect(() => {
        if (lyricsTextList.current.length === 0) return;
        if (nextTriggerTime.current === -1) return; // At end of lyrics

        if (timer >= nextTriggerTime.current) {
            if (currentLyricsIndex.current + 1 === lyricsTextList.current.length) return;

            currentLyricsIndex.current += 1;
            if (currentLyricsIndex.current + 1 === lyricsTextList.current.length) {
                nextTriggerTime.current = -1; // At end of lyrics
            } else {
                nextTriggerTime.current = lyricsTextList.current[currentLyricsIndex.current + 1].time; //Triggered next time
            }
            update_lyrics_block();
        }
    }, [timer]);

    const recordSize = height * 0.5;

    return (
        <div
            style={{
                width:  width,
                height: height,
            }}
            className="player"
        >
            <div
                style={{backgroundImage: `url(${configure.coverPath})`}}
                className="background-image"
            />

            <RecordCover
                size= {recordSize}
                imagePath = {configure.coverPath}
                timer = {timer}
                cycle = {configure.coverRotatingCycle}
                className = "cover"
            />

            <div
                className="title-text"
            >
                {configure.title}
            </div>

            <div
                className="subtitle-text"
            >
                {configure.subTitle}
            </div>

            {lyricsBlockList}

            <button className={isPlaying ? "pause-button" : "play-button"} onClick={() => {
                if (isPlaying) pause_audio();
                else play_audio();
            }} />
        </div>
    )
}

export default Player;
