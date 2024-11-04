import './App.css';
import Player from "./Player";
import PlayerConfigure from "./PlayerConfigure";
import {useRef} from "react";

function App() {
    const configure = useRef(new PlayerConfigure("http://localhost:3001/grapes.mp3"))
    return (
        <div className="App">
            <Player configure={configure.current}></Player>
        </div>
    );
}

export default App;
