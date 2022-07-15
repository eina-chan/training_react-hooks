// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonForm, PokemonInfoFallback, PokemonDataView} from '../pokemon'

const Status = {
  Idle: "idle",
  Pending: "pending",
  Resolved: "resloved",
  Rejected: "rejected",
};

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null);
  const [ status, setStatus ] = React.useState(Status.Idle);
  const [error, setError] = React.useState(null);
 
  React.useEffect(()=> {
    if (!pokemonName){
      return;
    } else {
      setPokemon(null);
      setStatus(Status.Pending);
      fetchPokemon(pokemonName)
      .then(pokemonData => {setPokemon(pokemonData); setStatus(Status.Resolved)}, error => {setError(error); setStatus(Status.Rejected)})
    }
  }, [pokemonName]);

  if (status === Status.Rejected) {
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (status === Status.Idle) {
    return 'Submit a pokemon';
  } else if(status === Status.Pending){
      return <PokemonInfoFallback name={pokemonName} />

  } else {
      return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
