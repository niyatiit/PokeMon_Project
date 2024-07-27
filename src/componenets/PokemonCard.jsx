import React, { useEffect, useState } from 'react'

function PokemonCard() {
    const [pokemon, setPokemon] = useState([])
    const [input, setInput] = useState("")
    const [error, setError] = useState(null)

    const API = "https://pokeapi.co/api/v2/pokemon?limit=54"

    const FeatchPokemon = async () => {
        try {
            const res = await fetch(API)
            const data = await res.json()
            // console.log(data)

            const detailsPokemon = data.results.map(async (pokemonData) => {
                const responce = await fetch(pokemonData.url)
                const result = await responce.json()
                // console.log(result)
                return result
            })
            const detailResponce = await Promise.all(detailsPokemon)
            setPokemon(detailResponce)
            // console.log(detailResponce)
        }
        catch (err) {
            console.log("error", err)
            setError(err)

        }
    }

    useEffect(() => {
        FeatchPokemon()
    }, [])

    if (error) {
        return (
            <>
                <h1 className='bg-zinc-800 h-screen text-white text-center text-3xl p-8'> Loding... </h1>
            </>
        )
    }

    const searchData = pokemon.filter((newElement) =>
        newElement.name.toLowerCase().includes(input.toLowerCase()));
    return (
        <>
            <div className='main w-full h-[1910vh] text-white bg-zinc-800'>
                <h1 className='text-center text-3xl p-8'> Pokemon Create </h1>
                <form>
                    <input type="text" placeholder='Search ...'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='text-black p-2 rounded-md flex justify-center left-[37%] relative w-80 outline-none ' />
                </form>

                <div className='box p-20 flex flex-wrap justify-center'>

                    {
                        searchData.map((current) => {
                            return (

                                <div className="boxes bg-zinc-600 m-2 mb-5 rounded-lg" key={current.id}>
                                    <img src={current.sprites.other.dream_world.front_default} alt={current.name} className='relative rounded-lg left-[5vw] pt-2 h-[25vh] w-[15vw]' />
                                    <h1 className='text-center p-3 text-3xl font-bold italic'> {current.name} </h1>
                                    <p className='text-center p-3 text-2xl'> {
                                        current.types.map((ele) => ele.type.name).join(" , ")
                                    } </p>
                                    <div className='firstLine flex justify-around p-3 '>
                                        <p> Height : {current.height} </p> &nbsp;&nbsp;&nbsp;&nbsp;
                                        <p> Weight : {current.weight} </p> &nbsp;&nbsp;&nbsp;&nbsp;
                                        <p> Speed : {current.stats[5].base_stat} </p>
                                    </div>
                                    <div className='secondLine flex justify-around p-3'>
                                        <p> Experience : {current.base_experience} </p> &nbsp;&nbsp;&nbsp;&nbsp;
                                        <p> Attack : {current.stats[1].base_stat} </p> &nbsp;&nbsp;&nbsp;&nbsp;
                                        <p> Abilites : {
                                            current.abilities.map((value) => value.ability.name)
                                                .slice(0, 1)
                                                .join(" , ")
                                        } </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default PokemonCard