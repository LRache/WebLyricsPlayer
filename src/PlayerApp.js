import Player from "./Player/Player";
import PlayerConfigure from "./Player/PlayerConfigure";
import {useEffect, useRef, useState} from "react";
import {useParams} from 'react-router-dom';


function PlayerApp() {
    const configure = useRef(new PlayerConfigure("http://localhost:8080/music/audio?id=10"))
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
    const [windowHeight, setWindowHeight] = useState(document.documentElement.clientHeight);
    const [isReady, setIsReady] = useState(false);
    const [isError, setIsError] = useState(false);
    const params = useParams();

    const lyrics = useRef("");
    const title = useRef("");
    const subTitle = useRef("");

    const id = params.id;

    async function load_lyrics() {
        const response = await fetch(`http://localhost:8080/music/lyrics?id=${id}`).catch(() => {
            throw new Error("fetch lyrics failed");
        });
        const ok = response.ok;
        if (!ok) {
            throw new Error("fetch lyrics failed");
        }
        const config = await response.json();
        lyrics.current = config.lyrics === undefined ? "" : config.lyrics;
    }

    async function load_config() {
        const response = await fetch(`http://localhost:8080/music/config?id=${id}`);
        const ok = response.ok;
        if (!ok) {
            throw new Error("fetch config failed");
        }
        const config = await response.json();
        title.current = config.title;
        subTitle.current = config.singer + " - " + config.album;
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowHeight(document.documentElement.clientHeight);
            setWindowWidth(document.documentElement.clientWidth);
        })
        console.log(params);

        Promise.all([load_lyrics(), load_config()])
            .then(() => {
                setIsReady(true);
            })
            .catch(() => {
                setIsError(true);
            })
    }, []);

    // window width
    configure.current.coverPath = "http://localhost:8080/music/cover?id=10";
    configure.current.title = "葡萄成熟时";
    configure.current.subTitle = "陈奕迅 - U87";
    configure.current.lyricsText = lyrics.current;

    if (isError) {
        return <div>OOPS,出错了</div>
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