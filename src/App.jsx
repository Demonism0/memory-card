import { useState, useEffect } from 'react';
import './App.css';
import getAll from './api-fetch';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [count, setCount] = useState(0);
  const [clickList, setClickList] = useState([]);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    getAll().then((result) => {
      setPokemonList(result);
    })
  }, []);

  function Card({ name, sprite }) {

    function shufflePokemons() {
      let newPokemonList = [...pokemonList];
      for (let currentIndex = newPokemonList.length - 1; currentIndex > 0; currentIndex -= 1) {
        let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        [newPokemonList[currentIndex], newPokemonList[randomIndex]] = [
          newPokemonList[randomIndex], newPokemonList[currentIndex]
        ]
      }
      setPokemonList(newPokemonList);
    }
  
    function clickHandler() {
      if (clickList.includes(name)) {
        if (count > highScore) {
          setHighScore(count);
        }
        setCount(0);
        setClickList([]);
      } else {
        setCount(count + 1);
        setClickList([...clickList, name]);
      }
      shufflePokemons();
    }
  
    return (
      <div className="card" onClick={clickHandler}>
        <img src={sprite} alt={name} />
        <div className="name">{name}</div>
      </div>
    )
  }

  return (
    <>
      <div className="header">
        <div className="title">
          <div className="project">Pokemon Memory Game</div>
          <div className="explanation">
            Get points by clicking on a card but don&apos;t click on any more than once!
          </div>
        </div>
        <div className="scoreboard">
          <div>Score: {count}</div>
          <div>Best: {highScore}</div>
        </div>
      </div>
      <div className="gameboard">
        {pokemonList.map(
          item => <Card
            key={item.id}
            name={item.name}
            sprite={item.sprite} />
        )}
      </div>
      <div className="footer">
        Created by <a href="https://github.com/Demonism0">Demonism0</a>
      </div>
    </>
  )
}

export default App
