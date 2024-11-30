import "./PlayListApp.css";
import {useNavigate} from "react-router-dom";

function PlayListBlock({index, id, title, singer, album}) {
    const imgSrc = `${process.env.REACT_APP_API_URL}/music/cover?id=${id}`;
    const navigate = useNavigate();
    return (
        <div className="play-list-block">
            <div className="play-list-block-index">{index}</div>
            <div className="play-list-block-img" style={{backgroundImage: `url(${imgSrc})`}} onClick={() => {
                navigate(`/player/${id}`);
            }}></div>
            <div className="play-list-block-title">{title}</div>
            <div className="play-list-block-singer">{singer}</div>
            <div className="play-list-block-album">{album}</div>
        </div>
    )
}

export default PlayListBlock;
