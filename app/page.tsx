// import Image from "next/image";
"use client"
import { useEffect, useState } from "react";
import "./globals.css";

export default function Home() {
  // Se requiere mostrar un catálogo de pokemones que permita buscar por nombre, además de ordenar (Alfabéticamente, ascendente y descendente), donde se mostrarán 20 tarjetas por página con un total de 4 páginas. Cada card deberá mostrar imagen, nombre y defensa/ataque. La distribución de las cards tendrá que ser de 5 filas por 4 columnas con un espacio entre ellas de 8 px, cómo se muestra a continuación.

  const [pokemons, setPokemons] = useState()
  // const 
  const [totalPokemons, setTotalPokemons] = useState()
  // const [showPokemons, setshowPokemons] = useState()
  const limitToShow = 20;
  const [imgIndex,setImgIndex] = useState(0);
  // const start = 20;

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=80')
      .then((res) => res.json())
      .then((res) => {
        nextPokemons(1, res.results)
        setTotalPokemons(res.results)
      })
  }, [])

  const nextPokemons = (page, paramPokes) => {
    const rangeFinalPokemons = page * limitToShow;
    const rangeStartPokemons = page * limitToShow - limitToShow;
    setImgIndex(rangeStartPokemons)
  
    const tempPokemons = [];

    paramPokes.forEach((element, index) => {
      if (index >= rangeStartPokemons && index < rangeFinalPokemons) {
        tempPokemons.push(paramPokes[index])
        console.log(index)
      }
    });

    setPokemons(tempPokemons)
  }



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <div>hi pokemon</div> */}
        <div className="grid grid-cols-4 gap-2">
          {pokemons && pokemons.map((item, index) => {
            // console.log(item)
            const urlImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + ((index + imgIndex) + 1) + ".svg"
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

        </div>
      </main>
    </div>
  );
}
