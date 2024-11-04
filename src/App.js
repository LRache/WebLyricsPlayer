import './App.css';
import Player from "./Player";
import PlayerConfigure from "./PlayerConfigure";
import {useRef} from "react";

function App() {
    const configure = useRef(new PlayerConfigure("./audio.mp3"))
    // window width
    configure.current.width = document.documentElement.clientWidth;
    configure.current.height = document.documentElement.clientHeight;
    configure.current.coverPath = "./img.JPG";
    configure.current.backgroundColor = "#878181";
    return (
        <div className="App">
            <Player configure={configure.current}></Player>
        </div>
    );
}

export default App;
