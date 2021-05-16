import React, { Component } from "react";
import { Spinner } from "../spinner/Spinner";
import { isNameInArr, toUpperCaseAllWords, } from "../utils/utils";
import { Sprite, Card, StyledLink } from "./styled_components";
export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    error: false,
    url: "",
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    this.setState({ name, imageUrl, pokemonIndex, url });
  }

  render() {
    const { imageUrl, error, imageLoading, pokemonIndex, name } = this.state;
    const { onToggleCuptured, pokemonsCaptured, fromCuptured } = this.props;

    const buttonCuptured = isNameInArr(pokemonsCaptured, name) ? (
      <button className="btn btn-secondary mx-auto d-block mt-2" disabled>
        Cuptured
      </button>
    ) : (
      <button
        onClick={() => onToggleCuptured(name, pokemonIndex)}
        className="btn btn-danger mx-auto d-block mt-2"
      >
        Cuptured
      </button>
    );

    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${pokemonIndex}`}>
          <Card className="card">
            <h5 className="card-header d-flex justify-content-between">{pokemonIndex}
            
              <span className="badge badge-light  font-weight-light text-wrap fs-6">
                {isNameInArr(pokemonsCaptured, name)
                  ? isNameInArr(pokemonsCaptured, name).date
                  : null}
              </span>
            </h5>
            {imageLoading ? <Spinner /> : null}

            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ error: true })}
              src={imageUrl}
              style={
                error
                  ? { display: "none" }
                  : imageLoading
                  ? null
                  : { display: "block" }
              }
            />
            
            {error ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  {" "}
                  Error Uploading!{" "}
                </span>
              </h6>
            ) : null}

            <div className="card-body mx-auto">
              <h6 className="card-title">{toUpperCaseAllWords(name)}</h6>
            </div>
          </Card>
        </StyledLink>
        {fromCuptured ? buttonCuptured 
        : <button
        onClick={() => onToggleCuptured(name, pokemonIndex)}
        className="btn btn-danger mx-auto d-block mt-2"
      >
        Delete
      </button>
        }
      </div>
    );
  }
}
