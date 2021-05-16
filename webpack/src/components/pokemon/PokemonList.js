import React, { Component } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
export default class PokemonList extends Component {
  _isMounted = false;

  state = {
    currentUrl: localStorage.currentUrl || "https://pokeapi.co/api/v2/pokemon/",
    pokemon: null,
    previous: null,
    next: null,
  };

  async componentDidMount() {
    const res = await axios.get(this.state.currentUrl);
    this.setState({
      pokemon: res.data.results,
      previous: res.data.previous,
      next: res.data.next,
    });
  }

  changeOnNextPage = () => {
    this.setState({
      currentUrl: this.state.next,
    });
  };

  changeOnPreviousPage = () => {
    this.setState({
      currentUrl: this.state.previous,
    });
  };

  async componentDidUpdate() {
    this._isMounted = true;
    const res = await axios.get(this.state.currentUrl);
    localStorage.currentUrl = this.state.currentUrl;

    if (this._isMounted) {
      this.setState({
        pokemon: res.data.results,
        previous: res.data.previous,
        next: res.data.next,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { onToggleCuptured, pokemonsCaptured } = this.props;
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <React.Fragment>
            <div className="row">
              {this.state.pokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                  onToggleCuptured={onToggleCuptured}
                  pokemonsCaptured={pokemonsCaptured}
                  fromCuptured={true}
                />
              ))}
            </div>
            <div className="d-flex justify-content-center">
              <nav aria-label="Page navigation ">
                <ul className="pagination pagination-lg">
                  {this.state.previous ? (
                    <li className="page-item ">
                      <button
                        className="page-link"
                        onClick={this.changeOnPreviousPage}
                      >
                        <span aria-hidden="true">&laquo;</span> Previous
                      </button>
                    </li>
                  ) : (
                    <li className="page-item disabled">
                      <button className="page-link ">
                        <span aria-hidden="true">&laquo;</span> Previous
                      </button>
                    </li>
                  )}

                  {this.state.next ? (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={this.changeOnNextPage}
                      >
                        Next <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  ) : (
                    <li className="page-item disabled">
                      <button className="page-link">
                        Next <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </React.Fragment>
        ) : (
          <h1>Loading...</h1>
        )}
      </React.Fragment>
    );
  }
}
