import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PokemonDetail.css';

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load Pokémon details');
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [name]);

  const handlePrevious = () => {
    const previousId = pokemon.id - 1;
    navigate(`/pokemon/${previousId}`);
  };

  const handleNext = () => {
    const nextId = pokemon.id + 1;
    navigate(`/pokemon/${nextId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pokemon-detail-container">
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={pokemon.id === 1}>
          &#8592;
        </button>
        <button onClick={handleNext} disabled={pokemon.id === 1010}>
          &#8594;
        </button>
      </div>
      <div className="pokemon-detail">
        <h1>{pokemon.name}</h1>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <div className="info">
          <h3>ID: {pokemon.id}</h3>
          <h3>Abilities:</h3>
          <ul className="no-bullets">
            {pokemon.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
          <h3>Stats:</h3>
          <ul className="no-bullets">
            {pokemon.stats.map((stat, index) => (
              <li key={index}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <p>
            <strong>Height:</strong> {pokemon.height / 10} m
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight / 10} kg
          </p>
          <p>
            <strong>Type:</strong> {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}
          </p>
        </div>
        <button className="back-button" onClick={() => navigate('/')}>
          HOME
        </button>
      </div>
    </div>
  );
}
