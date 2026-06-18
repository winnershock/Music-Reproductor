    function Player({ song }) {

    if (!song) {
        return <h2>Selecciona una canción</h2>;
    }

    return (
        <div
        style={{
            textAlign: "center"
        }}
        >

        <img
            src="https://placehold.co/300x300"
            alt="cover"
        />

        <h2>{song.title}</h2>

        <audio
            controls
            src={song.file}
        />

        </div>
    );
    }

    export default Player;