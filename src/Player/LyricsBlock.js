import "./LyricsBlock.css"
import {useEffect, useState} from "react";

export function LyricsBlock({ text, top, selected, exit }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);},  200);
    }, []);

    const className = selected
        ? "selected-lyrics-text"
        : exit
            ? "lyrics-text-nodisplay"
            : isMounted
                ? "unselected-lyrics-text"
                : "lyrics-text-nodisplay";

    return (
        <div
            style={{ top: top }}
            className={className}
        >
            {text}
        </div>
    );
}