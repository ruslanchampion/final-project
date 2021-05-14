import React, { Component } from 'react'
import PokemonCard from '../pokemon/PokemonCard'

export default class CapturedPokemons extends Component {
  

  
  render() {
    return (
      <React.Fragment>

        {this.props.pokemonsCaptured.length ? (
          <div className="row">
            {this.props.pokemonsCaptured.map(pokemon => (
              <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
              pokemonsCaptured={this.props.pokemonsCaptured}
              onToggleCuptured={ this.props.onToggleCuptured}
              />
            ))}
          </div>
          ) : (
            <h1 className="alert alert-dark text-center text-info" role="alert">Not any Captured Pokemons</h1>
          )}
      </React.Fragment>
    )
  }
}
