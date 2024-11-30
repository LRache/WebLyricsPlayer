import PlayListBlock from "./PlayListBlock";
import {useEffect, useState} from "react";

function PlayListApp() {
    const [musicList, setMusicList] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        document.title = "PlayList";

        fetch(`${process.env.REACT_APP_API_URL}/music/config?start=0`)
            .then(response => response.json())
            .then(data => {
                const configList = data.config;
                setMusicList(configList);
            })
            .catch(() => {
                setIsError(true);
                console.error("fetch playlist failed");
            });
    }, []);

    if (isError) {
        return (
            <div>Oops, 出错了</div>
        )
    }

    const blockList = musicList.map((config, index) => {
        return (
            <PlayListBlock
                key={config.id}
                index={index + 1}
                id={config.id}
                title={config.name}
                singer={config.singer}
                album={config.album}
            />
        )
    });

    return (
        <div>
            <h1>PlayList</h1>
            <div className="play-list-block-list">
                {blockList}
            </div>
        </div>
    );
}

export default PlayListApp;
