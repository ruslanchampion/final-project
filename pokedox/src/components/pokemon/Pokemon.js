import React, { Component } from "react";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import { toUpperCaseAllWords, isNameInArr } from "../utils/utils";
import { TYPE_COLORS } from "../utils/type_colors";

export default class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: "",
    },
    height: "",
    weight: "",
    eggGroups: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchSteps: "",
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.routeProps.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;

    const pokemonRes = await axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;

    let {
      hp,
      attack,
      defense,
      speed,
      specialAttack,
      specialDefense,
    } = this.state.stats;

    pokemonRes.data.stats.forEach((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
          break;
      }
    });

    const height = pokemonRes.data.height;
    const weight = pokemonRes.data.weight;
    const types = pokemonRes.data.types.map((type) => type.type.name);

    const abilities = pokemonRes.data.abilities.map((ability) => {
      return toUpperCaseAllWords(ability.ability.name);
    });

    const evs = pokemonRes.data.stats
      .filter((stat) => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map((stat) => {
        return toUpperCaseAllWords(`${stat.effort} ${stat.stat.name}`);
      })
      .join(", ");

    await axios.get(pokemonSpeciesUrl).then((res) => {
      let description = "";
      res.data.flavor_text_entries.forEach((flavor) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

      const eggGroups = res.data["egg_groups"]
        .map((group) => {
          return toUpperCaseAllWords(group.name);
        })
        .join(", ");

      const hatchSteps = 255 * (res.data["hatch_counter"] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps,
      });
    });
    this.setState({
      abilities,
      evs,
      height,
      weight,
      types,
      name,
      imageUrl,
      pokemonIndex,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
    });
  }
  render() {
    const {
      name,
      pokemonIndex,
      types,
      imageUrl,
      stats,
      description,
    } = this.state;

    const { pokemonsCaptured } = this.props
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{pokemonIndex}</h5>
              </div>
              <div className="col-7">
                <div className="float-right">
                  {types.map((type) => (
                    <span
                      key={type}
                      className="badge badge-primary badge-pill mr-1"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: "white",
                      }}
                    >
                      {type
                        .toLowerCase()
                        .split("-")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.substring(1)
                        )
                        .join(" ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3">
                <img
                  src={imageUrl}
                  alt={name}
                  className="card-img-top rounded mx-auto mt-2"
                />
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto">{toUpperCaseAllWords(name)}</h4>
                <ProgressBar name="HP" stats={stats.hp} />
                <ProgressBar name="Attack" stats={stats.attack} />
                <ProgressBar name="Defense" stats={stats.defense} />
                <ProgressBar name="Speed" stats={stats.speed} />
                <ProgressBar
                  name="Special Attack"
                  stats={stats.specialAttack}
                />
                <ProgressBar
                  name="Special Defense"
                  stats={stats.specialDefense}
                />
              </div>
              <div className="row mt-1">
                <div className="col">
                  <p className="p-3">{description}</p>
                </div>
              </div>
            </div>
          </div>
          <h5>{isNameInArr(pokemonsCaptured, name)
                  ? `Capture Time : ${isNameInArr(pokemonsCaptured, name).date}`
                  : null}</h5>
          <hr />
          <div className="card-body">
            <h5 className="card-title text-center">Profile</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right">Height:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.height} ft.</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Weight:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.weight} lbs</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Catch Rate:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.catchRate}%</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Gender Ratio:</h6>
                  </div>
                  <div className="col-6">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.genderRatioFemale}%`,
                          backgroundColor: "#c2185b",
                        }}
                        aria-valuenow="15"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.genderRatioFemale}</small>
                      </div>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.genderRatioMale}%`,
                          backgroundColor: "#1976d2",
                        }}
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.genderRatioMale}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right">Egg Groups:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.eggGroups} </h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Hatch Steps:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.hatchSteps}</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Abilities:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.abilities}</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">EVs:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.evs}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
