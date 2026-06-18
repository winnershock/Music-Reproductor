    function SongList({ songs, onSelect }) {

    return (
        <div>

        <h2>Canciones</h2>

        {
            songs.map(song => (

            <div
                key={song.id}
                onClick={() => onSelect(song)}
                style={{
                cursor: "pointer",
                marginBottom: "15px"
                }}
            >

                🎵 {song.title}

                <br />

                <small>
                {song.artist}
                </small>

            </div>

            ))
        }

        </div>
    );
    }

    export default SongList;