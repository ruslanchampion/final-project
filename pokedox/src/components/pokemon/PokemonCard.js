import React, { Component } from "react";
import styled from "styled-components";
import { Spinner } from "../spinner/Spinner";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)
  }
  -webkit-user-select: none;
`
export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    error: false,
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    this.setState({ name, imageUrl, pokemonIndex,});
  }

  render() {

    const {imageUrl, error, imageLoading, pokemonIndex, name} = this.state

    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <Card className="card">
          <h5 className="card-header">{pokemonIndex}</h5>

          {imageLoading ? (
            <Spinner/>
          ) : null}

          <Sprite className="card-img-top rounded mx-auto mt-2" 
          onLoad={() => this.setState({imageLoading: false})}
          onError={() => this.setState({error: true})}
          src={imageUrl}
          style={
            error ? { display: "none"} :
            imageLoading ? null : {display: "block"}
          }/>
          {error ? (<h6 className="mx-auto"> 
            <span className="badge badge-danger mt-2"> Error Uploading! </span>
          </h6>) : null}

          <div className="card-body mx-auto">
            <h6 className="card-title">
              {name
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
                .join(" ")}
            </h6>
          </div>
        </Card>
      </div>
    );
  }
}
