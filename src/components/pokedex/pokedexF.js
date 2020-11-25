import React from "react";
import Card from "../card";
import Pagination from "../pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./styles.css";

import display from "../../imgs/pokédexNAME.png";

export default class PokedexF extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemones: [],
      currentPage: 1,
      pokemonPerPage: 9,
    };
  }

  componentDidMount() {
    //Pedir la primera página con todos los pokemones
    const limit = this.state.pokemonPerPage;
    const url = "https://pokeapi.co/api/v2/pokemon";
    //Consumir la API de pokeapi
    fetch(`${url}?limit=${limit}`)
      .then((response) => response.json())
      .then((data) => this.setState({ pokemones: data.results }))
      .catch((error) => {
        console.log(error);
      });
  }

  fetchPage = (requestPage) => {
    // 1. Completar el método para poder obtener los pokemones dependiendo de la
    // actualizar el estado con la página solicitada
    this.setState({ currentPage: requestPage });
    const limit = this.state.pokemonPerPage;
    const url = "https://pokeapi.co/api/v2/pokemon";
    fetch(`${url}?limit=${limit}&offset=${(requestPage - 1) * 9}`)
      .then((response) => response.json())
      .then((data) => this.setState({ pokemones: data.results }))
      .catch((error) => {
        console.log(error);
      });
  };

  getImage = (index) => {
    let pokemonImg = "";

    //La imagen para el Pokemon con id 11 y nos encontramos en la segunda página
    //0 -> {"name":"metapod","url":"https://pokeapi.co/api/v2/pokemon/11/"}
    //          0   + 1  + (( 2 - 1 ) * 10) = 11
    //          0   + 1  + (( 3 - 1 ) * 10) = 21
    let id = index + 1 + (this.state.currentPage - 1) * 9;

    if (id < 10) {
      pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${id}.png`;
    } else if (id >= 10 && id < 100) {
      pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${id}.png`;
    } else {
      pokemonImg = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
    }

    return pokemonImg;
  };

  render() {
    return (
      <div className="pokedex-bg">
        <div className="pokedex-display">
          <img src={display} alt="display"></img>
          <h4 className="pokedex-name">{this.props.trainer}</h4>
          <div className="pokedex-container">
            {this.state.pokemones.map((pokemon, index) => {
              // 2. Solucionar el problema de obtener las imagenes de los pokemones con id <
              // 10, > 10, > 100
              let pokemonImg = this.getImage(index);
              return (
                <Card key={index + 1} name={pokemon.name} img={pokemonImg} />
              );
            })}
          </div>
          <div>
            <p>Pages</p><br/>
            <Pagination fetchPageFn={this.fetchPage} />
          </div>
        </div>
      </div>
    );
  }
}