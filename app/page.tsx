// import Image from "next/image";
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { useEffect, useState } from "react";
import "./globals.css";

export default function Home() {
  // Se requiere mostrar un catálogo de pokemones que permita buscar por nombre, además de ordenar (Alfabéticamente, ascendente y descendente), donde se mostrarán 20 tarjetas por página con un total de 4 páginas. Cada card deberá mostrar imagen, nombre y defensa/ataque. La distribución de las cards tendrá que ser de 5 filas por 4 columnas con un espacio entre ellas de 8 px, cómo se muestra a continuación.

  const [pokemons, setPokemons]: any = useState()
  const [totalPokemons, setTotalPokemons] = useState()
  const limitToShow = 20;
  const [value, setValue] = useState('');
  // const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=80')
      .then((res) => res.json())
      .then((res) => {
        nextPokemons(1, res.results)
        setTotalPokemons(res.results)

      })
  }, [])

  const findPokemonByName = (paramPokes: any) => {
    // console.log("value")
    // console.log(value)
    const pokemonFound = paramPokes.find((item: any) => item.name === value);
    console.log(pokemonFound)
    if(pokemonFound){
      setPokemons([pokemonFound])
    }
  }

  const sortAscByName = (paramPokes: any) => {
    paramPokes.sort(function (a: any, b: any) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    nextPokemons(1, paramPokes)

  }


  const sortDescByName = (paramPokes: any) => {
    paramPokes.sort(function (a: any, b: any) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
    nextPokemons(1, paramPokes)

  }

  const nextPokemons = (page: any, paramPokes: any) => {
    const rangeFinalPokemons = page * limitToShow;
    const rangeStartPokemons = page * limitToShow - limitToShow;
    // setImgIndex(rangeStartPokemons)

    const tempPokemons: any = [];

    paramPokes.forEach((element: any, index: any) => {
      if (index >= rangeStartPokemons && index < rangeFinalPokemons) {
        tempPokemons.push(paramPokes[index])
        // console.log(index)
      }
    });

    setPokemons(tempPokemons)
  }



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-4 gap-4">
          <input
            value={value}
            onChange={e => { setValue(e.currentTarget.value); }}
            type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          <button
            onClick={() => { findPokemonByName(totalPokemons) }}
            type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Search</button>
        </div>

        {/* <div>hi pokemon</div> */}
        <div className="grid grid-cols-4 gap-2">
          {pokemons && pokemons.map((item: any, index: number) => {
            const imgNumber = item.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
            const urlImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + (imgNumber) + ".svg"
            return (<div key={index} className="cardPokemon flex items-center">
              <img src={urlImage} width={40} />
              <div>
                <strong>{item.name} </strong>
                {/* <span>Technical advisor</span> */}
              </div>
            </div>)
          })}

        </div>
        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => { nextPokemons(1, totalPokemons) }}
            type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">1</button>
          <button
            onClick={() => { nextPokemons(2, totalPokemons) }}

            type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">2</button>
          <button
            onClick={() => { nextPokemons(3, totalPokemons) }}

            type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">3</button>
          <button
            onClick={() => { nextPokemons(4, totalPokemons) }}

            type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">4</button>

          <button
            onClick={() => { sortAscByName(totalPokemons) }}

            type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Asc</button>

          <button
            onClick={() => { sortDescByName(totalPokemons) }}

            type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Desc</button>

        </div>
      </main>
    </div>
  );
}
