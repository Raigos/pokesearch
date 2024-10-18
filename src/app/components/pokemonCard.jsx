import React from 'react';

const PokemonCard = ({ pokemon }) => {
  const getTypeColor = (type) => {
    const colors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-700',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    return colors[type] || 'bg-gray-400';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
      <div className="bg-gray-200 p-4">
        <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 mx-auto" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-center capitalize">{pokemon.name}</h2>
        <div className="flex justify-center space-x-2 mb-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`${getTypeColor(type)} text-white text-xs font-semibold px-2 py-1 rounded-full`}
            >
              {type}
            </span>
          ))}
        </div>
        <div className="text-sm">
          <p className="font-semibold mb-1">Abilities:</p>
          <ul className="list-disc list-inside">
            {pokemon.abilities.map((ability) => (
              <li key={ability} className="capitalize">{ability}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;