import "./ProgressBar.css"
import {useEffect, useRef} from "react";

function ProgressBar({duration, current, setCurrent}) {
    const progressBar = useRef(null);

    useEffect(() => {
        const progressBarClicked = (e) => {
            const p = e.offsetX / progressBar.current.offsetWidth * duration;
            if (setCurrent) {
                setCurrent(p);
            }
        }
        progressBar.current.addEventListener("click", progressBarClicked);

        return () => {
            if (progressBar.current) {
                progressBar.current.removeEventListener("click", progressBarClicked);
            }
        }
    }, [duration, setCurrent]);

    return (
        <div className="progress-bar-container" ref={progressBar}>
            <div className="progress-bar-value" style={{ width: current / duration * 100 + "%" }}></div>
        </div>
    )
}

export default ProgressBar;
