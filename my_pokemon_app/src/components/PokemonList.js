import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PokemonList.css';

const PokemonList = ({ searchTerm }) => {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const loadPokemon = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const pokemonDetails = await Promise.all(
        response.data.results.map(async (p) => {
          const pokemonDetail = await axios.get(p.url);
          return { name: p.name, image: pokemonDetail.data.sprites.front_default };
        })
      );
      setPokemon((prevPokemon) => [...prevPokemon, ...pokemonDetails]);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
    setLoading(false);
  }, [offset]);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);


  const lastPokemonElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setOffset(prevOffset => prevOffset + 20);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading]);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-list">
      {filteredPokemon.map((p, index) => {
        const pokemonCard = (
          <div className="card" key={index}>
            <Link to={`/pokemon/${p.name}`} className="pokemon-item">
              <img src={p.image} alt={p.name} className="pokemon-image" />
              <p className='word'>{p.name}</p>
            </Link>
            <Link to={`/pokemon/${p.name}`} className="view-details-button">
              View Details
            </Link>
          </div>
        );

        if (index === filteredPokemon.length - 1) {
          return (
            <div ref={lastPokemonElementRef} key={index}>
              {pokemonCard}
            </div>
          );
        } else {
          return pokemonCard;
        }
      })}
      {loading && <p className="loading">Loading...</p>}
    </div>
  );
};

export default PokemonList;