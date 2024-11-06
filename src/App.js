import './App.css';
import Player from "./Player/Player";
import PlayerConfigure from "./Player/PlayerConfigure";
import {useEffect, useRef, useState} from "react";

function App() {
    const configure = useRef(new PlayerConfigure("./grape.mp3"))
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
    const [windowHeight, setWindowHeight] = useState(document.documentElement.clientHeight);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(document.documentElement.clientWidth);
            setWindowHeight(document.documentElement.clientHeight);
        })
    }, []);

    // window width
    configure.current.coverPath = "./cover.jpg";
    configure.current.backgroundColor = "#878181";
    configure.current.title = "葡萄成熟时";
    configure.current.subTitle = "陈奕迅 - U87"
    return (
        <div className="App">
            <Player
                configure={configure.current}
                width={windowWidth}
                height={windowHeight}
            />
        </div>
    );
}

export default App;
