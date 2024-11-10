import "./LyricsBlock.css"
import {useEffect, useState} from "react";

export function LyricsBlock({ text, top, selected }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);
        },  100);

    }, []);

    const className = selected
        ? "selected-lyrics-text"
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