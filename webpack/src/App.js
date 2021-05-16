import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/layout/NavBar";
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";
import CapturedPokemons from "./components/layout/CapturedPokemons";
import { toConverDate, isNameInArr } from "./components/utils/utils";

class App extends Component {
  state = {
    pokemonsCaptured: localStorage.cupturedPokemos
      ? JSON.parse(localStorage.cupturedPokemos)
      : [],
  };

  url = "https://pokeapi.co/api/v2/pokemon/";

  onToggleCuptured = (name, pokemonIndex) => {
    if (isNameInArr(this.state.pokemonsCaptured, name)) {
      this.setState(({ pokemonsCaptured }) => {
        const ind = pokemonsCaptured.findIndex((el) => el.name === name);
        const before = pokemonsCaptured.slice(0, ind);
        const after = pokemonsCaptured.slice(ind + 1);
        const newArr = [...before, ...after];
        return {
          pokemonsCaptured: newArr,
        };
      });

      return;
    }

    const cupturedPokemon = {
      name,
      url: `${this.url}${pokemonIndex}/`,
      date: toConverDate(new Date()),
    };
    this.setState(({ pokemonsCaptured }) => {
      const newArr = [...pokemonsCaptured, cupturedPokemon];
      return {
        pokemonsCaptured: newArr,
      };
    });
  };

  componentDidUpdate() {
    localStorage.cupturedPokemos = JSON.stringify(this.state.pokemonsCaptured);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Route
              exact
              path="/"
              render={() => (
                <Dashboard
                  onToggleCuptured={this.onToggleCuptured}
                  pokemonsCaptured={this.state.pokemonsCaptured}
                />
              )}
            />
            <Route
              exact
              path="/pokemon/:pokemonIndex"
              render={(routeProps) => (
                <Pokemon
                  pokemonsCaptured={this.state.pokemonsCaptured}
                  routeProps={routeProps}
                />
              )}
            />
            <Route
              exact
              path="/captured_pokemons/"
              render={() => (
                <CapturedPokemons
                  pokemonsCaptured={this.state.pokemonsCaptured}
                  onToggleCuptured={this.onToggleCuptured}
                />
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
