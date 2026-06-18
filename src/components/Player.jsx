    import {
    useState,
    useRef,
    useEffect
    } from "react";

    function Player({
    song,
    onNext,
    onPrev
    }) {

    // Referencia al elemento audio
    const audioRef = useRef(null);

    // Estado de reproducción
    const [isPlaying, setIsPlaying] =
        useState(true);

    // Tiempo actual
    const [currentTime, setCurrentTime] =
        useState(0);

    // Duración total
    const [duration, setDuration] =
        useState(0);

    /*
        Cuando cambia la canción:
        - Se reproduce automáticamente
    */
    useEffect(() => {

        if (audioRef.current) {

        audioRef.current.play();

        setIsPlaying(true);

        }

    }, [song]);

    /*
        Escucha eventos del audio:
        - duración
        - progreso
    */
    useEffect(() => {

        const audio = audioRef.current;

        const updateTime = () => {
        setCurrentTime(audio.currentTime);
        };

        const loadMetadata = () => {
        setDuration(audio.duration);
        };

        audio.addEventListener(
        "timeupdate",
        updateTime
        );

        audio.addEventListener(
        "loadedmetadata",
        loadMetadata
        );

        return () => {

        audio.removeEventListener(
            "timeupdate",
            updateTime
        );

        audio.removeEventListener(
            "loadedmetadata",
            loadMetadata
        );

        };

    }, [song]);

    /*
        Play / Pause
    */
    const togglePlay = () => {

        if (isPlaying) {

        audioRef.current.pause();

        } else {

        audioRef.current.play();

        }

        setIsPlaying(!isPlaying);

    };

    /*
        Convierte segundos a:
        3:45
        1:02
    */
    const formatTime = (time) => {

        const minutes =
        Math.floor(time / 60);

        const seconds =
        Math.floor(time % 60);

        return `${minutes}:${
        seconds < 10
            ? "0" + seconds
            : seconds
        }`;

    };

    if (!song) {

        return (
        <h2>
            Selecciona una canción
        </h2>
        );

    }

    return (
        <div
        style={{
            textAlign: "center"
        }}
        >

        {/* Portada temporal */}
        <img
            src="https://placehold.co/300x300"
            alt="cover"
        />

        <h2>
            {song.title}
        </h2>

        <h3>
            {song.artist}
        </h3>

        {/* Botones */}
        <div
            style={{
            marginBottom: "20px"
            }}
        >

            <button
            onClick={onPrev}
            >
            ⏮
            </button>

            <button
            onClick={togglePlay}
            >
            {
                isPlaying
                ? "⏸"
                : "▶"
            }
            </button>

            <button
            onClick={onNext}
            >
            ⏭
            </button>

        </div>

        {/* Barra progreso */}
        <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => {

            audioRef.current.currentTime =
                e.target.value;

            setCurrentTime(
                e.target.value
            );

            }}
            style={{
            width: "300px"
            }}
        />

        {/* Tiempo */}
        <div
            style={{
            marginTop: "10px"
            }}
        >

            {formatTime(currentTime)}

            {" / "}

            {formatTime(duration)}

        </div>

        {/* Audio oculto */}
        <audio
            ref={audioRef}
            src={song.file}
            onEnded={onNext}
        />

        </div>
    );
    }

    export default Player;