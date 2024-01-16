import React, { useState, useEffect } from "react"
import axios from "axios"

const PokemonTier = ({ targetPoints }) => {
    const [pokemonData, setPokemonData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://sheets.googleapis.com/v4/spreadsheets/12jDAuNvID0fuF2PT4Jmwkbhax97mFcvrcHF-wDK3Snc/values/Data?key=AIzaSyC4emN9L0v7jsh_aqsQ1LFNJ6XjOzal358`
                )
                const values = response.data.values

                // Assuming the first row contains headers
                const headers = values[0]
                const data = values.slice(1)

                // Map the data before filtering and sorting
                const mappedData = data.map((row) => {
                    const pokemon = {}
                    headers.forEach((header, index) => {
                        pokemon[header] = row[index]
                    })
                    return pokemon
                })

                // Filter out rows with empty or non-numeric Pts values
                const filteredData = mappedData.filter(
                    (row) => !isNaN(row["Pts"])
                )

                // Filter rows based on the target point value
                const targetData = filteredData.filter(
                    (row) => row["Pts"] == targetPoints
                )

                setPokemonData(targetData)
            } catch (error) {
                console.error("Error fetching data from Google Sheets:", error)
            }
        }

        fetchData()
    }, [targetPoints])

    const constructSmogonURL = (pokemonName) => {
        const formattedName = pokemonName.toLowerCase().replace(" ", "-")
        return `https://www.smogon.com/dex/sv/pokemon/${formattedName}`
    }

    return (
        <div>
            <h2>{targetPoints} Points</h2>
            <ul>
                {pokemonData.map((pokemon, index) => (
                    <li key={index}>
                        <a
                            href={constructSmogonURL(pokemon.Pokemon)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            {pokemon.Pokemon}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PokemonTier
