    import { useRef, useEffect } from "react";

    function Player({ song, onNext, onPrev }) {

    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
        audioRef.current.play();
        }
    }, [song]);

    return (
        <div style={{ textAlign: "center" }}>

        <img
            src="https://placehold.co/300x300"
            alt="cover"
        />

        <h2>{song.title}</h2>

        <h3>{song.artist}</h3>

        <div>

            <button onClick={onPrev}>
            ⏮
            </button>

            <button
            onClick={() => audioRef.current.play()}
            >
            ▶
            </button>

            <button onClick={onNext}>
            ⏭
            </button>

        </div>

        <audio
            ref={audioRef}
            controls
            src={song.file}
            onEnded={onNext}
        />

        </div>
    );
    }

    export default Player;