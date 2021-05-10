import React, { Component } from 'react'



export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{
          backgroundColor: '#ef5350',
          color: 'white',
          justifyContent: 'center',
        }}>
          <a className="navbar-brand col-sm-3 col-md-2 mr-0 align-items navbar-scroll"
          href="#/"
          >
            Pokemons
            </a>
            
          <a className="navbar-brand col-sm-5 col-md-2 mr-0 align-items navbar-scroll"
          href="#app"
          >
            Captured Pokemons
            </a>
        </nav>
      </div>
    )
  }
}
