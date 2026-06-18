import { useState } from "react";

import "./App.css";

import { songs } from "./data/songs";
import SongList from "./components/SongList";
import Player from "./components/Player";

function App() {

  // Canción actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Modo de reproducción
  const [playMode, setPlayMode] =
    useState("sequential");

  /*
    SIGUIENTE CANCIÓN
  */
  const nextSong = () => {

    // ALEATORIO
    if (playMode === "shuffle") {

      let randomIndex;

      do {

        randomIndex =
          Math.floor(
            Math.random() *
            songs.length
          );

      } while (
        randomIndex === currentIndex
      );

      setCurrentIndex(randomIndex);

      return;
    }

    // REPETIR UNA
    if (playMode === "repeat-one") {

      setCurrentIndex(currentIndex);

      return;
    }

    // REPETIR LISTA
    if (playMode === "repeat-all") {

      setCurrentIndex((prev) =>

        prev === songs.length - 1
          ? 0
          : prev + 1

      );

      return;
    }

    // SECUENCIAL

  setCurrentIndex((prev) =>

    prev === songs.length - 1
      ? 0
      : prev + 1

  );

  };

  /*
    CANCIÓN ANTERIOR
  */
  const prevSong = () => {

    if (
      currentIndex === 0
    ) {

      setCurrentIndex(
        songs.length - 1
      );

    } else {

      setCurrentIndex(
        currentIndex - 1
      );

    }

  };

  return (

    <div className="app">

      <div className="main">

        {/* BIBLIOTECA */}
        <div className="sidebar">

          <h2>
            Biblioteca
          </h2>

          <SongList
            songs={songs}
            onSelect={(song) => {

              const index =
                songs.findIndex(
                  s =>
                    s.id === song.id
                );

              setCurrentIndex(index);

            }}
          />

        </div>

        {/* CONTENIDO */}
        <div className="content">

          <div>

            {/* SELECTOR DE MODO */}

            <div
              style={{
                textAlign: "center",
                marginBottom: "20px"
              }}
            >

              <label>
                Modo:
              </label>

              <select
                value={playMode}
                onChange={(e) =>
                  setPlayMode(
                    e.target.value
                  )
                }
              >

                <option
                  value="sequential"
                >
                  Secuencial
                </option>

                <option
                  value="shuffle"
                >
                  Aleatorio
                </option>

                <option
                  value="repeat-one"
                >
                  Repetir una
                </option>

                <option
                  value="repeat-all"
                >
                  Repetir lista
                </option>

              </select>

            </div>

            {/* REPRODUCTOR */}

            <Player
              song={
                songs[currentIndex]
              }
              onNext={nextSong}
              onPrev={prevSong}
            />

          </div>

        </div>

      </div>

      <div className="footer">

        <strong>
          Mi Reproductor
        </strong>

      </div>

    </div>

  );

}

export default App;