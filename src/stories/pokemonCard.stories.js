import React from 'react';
import PokemonCard from '../app/components/pokemonCard';

export default {
  title: 'Components/PokemonCard',
  component: PokemonCard,
  argTypes: {
    pokemon: { control: 'object' },
  },
};

const Template = (args) => <PokemonCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  pokemon: {
    id: 25,
    name: 'pikachu',
    types: ['electric'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    abilities: ['static', 'lightning-rod'],
  },
};

export const WaterType = Template.bind({});
WaterType.args = {
  pokemon: {
    id: 7,
    name: 'squirtle',
    types: ['water'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    abilities: ['torrent', 'rain-dish'],
  },
};

export const DualType = Template.bind({});
DualType.args = {
  pokemon: {
    id: 6,
    name: 'charizard',
    types: ['fire', 'flying'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    abilities: ['blaze', 'solar-power'],
  },
};

export const LongName = Template.bind({});
LongName.args = {
  pokemon: {
    id: 122,
    name: 'mr-mime',
    types: ['psychic', 'fairy'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png',
    abilities: ['soundproof', 'filter', 'technician'],
  },
};