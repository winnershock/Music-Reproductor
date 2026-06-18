import { useState } from "react";

import "./App.css";

import { songs }
from "./data/songs";

import SongList
from "./components/SongList";

import Player
from "./components/Player";

function App() {

  // Canción actual
  const [currentIndex, setCurrentIndex] =
    useState(0);

  /*
    Siguiente canción
  */
  const nextSong = () => {

    setCurrentIndex((prev) =>

      prev === songs.length - 1
        ? 0
        : prev + 1

    );

  };

  /*
    Canción anterior
  */
  const prevSong = () => {

    setCurrentIndex((prev) =>

      prev === 0
        ? songs.length - 1
        : prev - 1

    );

  };

  return (

    <div className="app">

      <div className="main">

        <div className="sidebar">

          <h2>
            Biblioteca
          </h2>

          <SongList
            songs={songs}
            onSelect={(song) => {

              const index =
                songs.findIndex(
                  s => s.id === song.id
                );

              setCurrentIndex(index);

            }}
          />

        </div>

        <div className="content">

          <Player
            song={songs[currentIndex]}
            onNext={nextSong}
            onPrev={prevSong}
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