import {useEffect, useRef, useState} from "react";

/**
 *
 * @param configure PlayerConfigure
 * @returns {JSX.Element}
 * @constructor
 */

function Player({configure}) {
    const audioPlayer = useRef(new Audio(configure.audioPath))
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
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

    return (
        <div>
            <button onClick={() => {
                if (isPlaying) pause_audio();
                else play_audio()
            }}>{isPlaying ? "Pause" : "Play"}</button>
        </div>
    )
}

export default Player;
