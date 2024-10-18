'use client'
import { useState, useEffect } from 'react';
import PokemonCard from '../pokemonCard';
const CACHE_KEY = 'pokemonData';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            console.log('Using cached data');
            setPokemon(data);
            setIsLoading(false);
            return;
          }
        }

        console.log('Fetching fresh data');
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const { results } = await response.json();

        const pokemonData = await Promise.all(results.map(async (p) => {
          const res = await fetch(p.url);
          const pokemonDetails = await res.json();
          return {
            id: pokemonDetails.id,
            name: pokemonDetails.name,
            types: pokemonDetails.types.map(t => t.type.name),
            image: pokemonDetails.sprites.front_default,
            abilities: pokemonDetails.abilities.map(a => a.ability.name),
            stats: pokemonDetails.stats.map(s => ({ name: s.stat.name, value: s.base_stat }))
          };
        }));

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: pokemonData,
          timestamp: Date.now()
        }));

        setPokemon(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.types.some(type => type.toLowerCase().includes(searchTerm.toLowerCase())) ||
    p.abilities.some(ability => ability.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <input 
        type="text" 
        placeholder="Search Pokemon..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  {filteredPokemon.map((pokemon) => (
    <PokemonCard key={pokemon.id} pokemon={pokemon} />
  ))}
</div>

    </div>
  );
}