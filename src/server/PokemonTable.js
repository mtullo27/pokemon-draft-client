import React, { useState, useEffect } from "react"
import axios from "axios"

const PokemonTable = () => {
    const [pokemonData, setPokemonData] = useState([])
    const [updatedData, setUpdatedData] = useState({}) // Define updatedData state

    useEffect(() => {
        // Fetch data from the server
        const fetchData = async () => {
            const response = await axios.get(
                "http://localhost:3001/api/pokemon"
            )
            setPokemonData(response.data)
        }

        fetchData()
    }, [])

    const handleEdit = async (id) => {
        // Assuming you have a form or modal to edit data, update updatedData state here
        // For example, you might have input fields where users can modify the data
        // and you update the state accordingly.

        // Example: setUpdatedData({ pokemonID: 'new value', pokemon: 'new value', ... });

        // Then, update data on the server
        await axios.put(`http://localhost:3001/api/pokemon/${id}`, updatedData)
        // Refresh data
        const response = await axios.get("http://localhost:3001/api/pokemon")
        setPokemonData(response.data)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PokemonID</th>
                        <th>Pokemon</th>
                        <th>Pts</th>
                        <th>SmogonName</th>
                        <th>CoachID</th>
                    </tr>
                </thead>
                <tbody>
                    {pokemonData.map((pokemon) => (
                        <tr key={pokemon.id}>
                            <td>{pokemon.id}</td>
                            <td>{pokemon.pokemonID}</td>
                            <td>{pokemon.pokemon}</td>
                            <td>{pokemon.pts}</td>
                            <td>{pokemon.smogonName}</td>
                            <td>{pokemon.coachID}</td>
                            <td>
                                <button onClick={() => handleEdit(pokemon.id)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PokemonTable
