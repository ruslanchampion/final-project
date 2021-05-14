import React, { Component } from 'react'
import PokemonList from '../pokemon/PokemonList'

export default class Dashboard extends Component {
  render() {
    const {onToggleCuptured, pokemonsCaptured} = this.props
    return (
      <div className="row">
        <div className="col">
          <PokemonList onToggleCuptured={onToggleCuptured} pokemonsCaptured={pokemonsCaptured}/>
        </div>
        
      </div>
    )
  }
}
