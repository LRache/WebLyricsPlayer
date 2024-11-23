import Player, {LYRICS_TEXT_POSITION} from "./Player/Player";
import PlayerConfigure from "./Player/PlayerConfigure";
import {useEffect, useRef, useState} from "react";
import {useParams} from 'react-router-dom';


function PlayerApp() {
    const configure = useRef(new PlayerConfigure());
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
    const [windowHeight, setWindowHeight] = useState(document.documentElement.clientHeight);
    const [isReady, setIsReady] = useState(false);
    const [isError, setIsError] = useState(false);
    const params = useParams();

    const id = params.id;

    async function load_lyrics() {
        console.log(process.env.REACT_APP_API_URL);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/music/lyrics?id=${id}`).catch(() => {
            throw new Error("fetch lyrics failed");
        });
        const ok = response.ok;
        if (!ok) {
            throw new Error("fetch lyrics failed");
        }
        const config = await response.json();
        configure.current.lyricsText = config.lyrics === undefined ? "" : config.lyrics;
    }

    async function load_config() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/music/config?id=${id}`);
        const ok = response.ok;
        if (!ok) {
            throw new Error("fetch config failed");
        }
        const configJson = await response.json();
        configure.current.title = configJson.config.name;
        configure.current.subTitle = configJson.config.singer + " - " + configJson.config.album;
        document.title = configJson.config.name + " " + configJson.config.singer + " - " + configJson.config.album;
        if (configJson.config.multilineLyrics) {
            configure.current.BottomLyricsCount = 3;
            configure.current.TopLyricsCount = 3;
            configure.current.lyricsTextPosition = LYRICS_TEXT_POSITION[1];
        } else {
            configure.current.BottomLyricsCount = 4;
            configure.current.TopLyricsCount = 4;
            configure.current.lyricsTextPosition = LYRICS_TEXT_POSITION[0];
        }
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowHeight(document.documentElement.clientHeight);
            setWindowWidth(document.documentElement.clientWidth);
        })

        Promise.all([load_lyrics(), load_config()])
            .then(() => {
                setIsReady(true);
            })
            .catch(() => {
                setIsError(true);
            })
    }, []);

    // window width
    configure.current.audioPath = `${process.env.REACT_APP_API_URL}/music/audio?id=${id}`;
    configure.current.coverPath = `${process.env.REACT_APP_API_URL}/music/cover?id=${id}`;

    if (isError) {
        return (
            <div>
                <div>OOPS,出错了</div>
                <div>未找到id={id}的音乐</div>
            </div>
        )
    }
    return (
        <Player
            configure={configure.current}
            width  = {windowWidth}
            height = {windowHeight}
            ready  = {isReady}
        />
    );
}

export default PlayerApp;