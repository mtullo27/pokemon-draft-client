import React, { useState, useEffect } from "react"
import axios from "axios"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from "@mui/material"
import PokemonCard from "../TierList/PokemonCard"

const TeamBoxHorizontal = ({ coach, color }) => {
    const [pokemonData, setPokemonData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY
                const response = await axios.get(
                    `https://sheets.googleapis.com/v4/spreadsheets/1E3wHnKj8i4C40Lj7SwKcVrbPhOFUdzNkJnpGuTwe73I/values/Data?key=${apiKey}`
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
                    (row) => row["Coach"] == coach
                )

                setPokemonData(filteredData)
            } catch (error) {
                console.error("Error fetching data from Google Sheets:", error)
            }
        }

        fetchData()
    }, [coach])

    const constructSmogonURL = (pokemonName) => {
        const formattedName = pokemonName.toLowerCase().replace(" ", "-")
        return `https://www.smogon.com/dex/sv/pokemon/${formattedName}`
    }
    const constructPicURL = (pokemonNumber, pokemonName) => {
        const numericPokemonNumber = parseInt(pokemonNumber, 10)
        if (numericPokemonNumber < 1000) {
            const formattedNumber = String(numericPokemonNumber).padStart(
                4,
                "0"
            )
            return `https://projectpokemon.org/images/sprites-models/sv-sprites-home/${formattedNumber}.png`
        } else {
            const formattedName = pokemonName.toLowerCase().replace(" ", "-")
            return `https://www.smogon.com/dex/media/sprites/xy/${formattedName}.gif`
        }
    }

    return (
        <TableContainer component={Paper} style={{ backgroundColor: color }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {pokemonData
                            .sort((a, b) => b.Pts - a.Pts)
                            .map((pokemon, index) => (
                                <TableCell
                                    key={index}
                                    align="center"
                                    size="small"
                                >
                                    <PokemonCard
                                        pokemon={pokemon.Pokemon}
                                        imageUrl={constructPicURL(
                                            pokemon?.Number,
                                            pokemon?.SmogonName
                                        )}
                                        smogonUrl={constructSmogonURL(
                                            pokemon?.Pokemon
                                        )}
                                        drafted={pokemon?.Drafted}
                                        color={color}
                                        team={true}
                                    />
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    )
}

export default TeamBoxHorizontal
