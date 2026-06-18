import { useState } from "react";
import { songs } from "./data/songs";
import SongList from "./components/SongList";
import Player from "./components/Player";
import "./App.css";

function App() {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className="app">

      <div className="main">

        <div className="sidebar">
          <h2>Biblioteca</h2>

          <SongList
            songs={songs}
            onSelect={setCurrentSong}
          />
        </div>

        <div className="content">

          <Player
            song={currentSong}
          />

        </div>

      </div>

      <div className="footer">
        Reproductor
      </div>

    </div>
  );
}

export default App;