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
  const [ state, setState ] = React.useState({
    status: Status.Idle, 
    pokemon: null,
    error: null,
  });
  const { status, pokemon, error } = state;

 
  React.useEffect(()=> {
    if (!pokemonName){
      return;
    } else {
      setState({status: Status.Pending});
      fetchPokemon(pokemonName)
      .then(
        pokemon => {
          setState({pokemon, status: Status.Resolved})
        },
        error => {
          setState({error, status: Status.Rejected})
        },
      )
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

  } else if(status === Status.Resolved){
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
