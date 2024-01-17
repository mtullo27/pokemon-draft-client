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
import PokemonCard from "./PokemonCard"

const PokemonTier = ({ targetPoints, color }) => {
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
    const constructPicURL = (pokemonName) => {
        const formattedName = pokemonName.toLowerCase().replace(" ", "-")
        return `https://www.smogon.com/dex/media/sprites/xy/${formattedName}.gif`
    }

    return (
        <TableContainer component={Paper} style={{ backgroundColor: color }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" size="small">
                            <Typography variant="h6" fontWeight="bold">
                                {targetPoints} Points
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pokemonData.map((pokemon, index) => (
                        <TableRow
                            key={index}
                            style={{
                                backgroundColor:
                                    pokemon?.Drafted === "x" ? "white" : color
                            }}
                        >
                            <TableCell size="small">
                                <PokemonCard
                                    pokemon={pokemon.Pokemon}
                                    imageUrl={constructPicURL(
                                        pokemon?.SmogonName
                                    )}
                                    smogonUrl={constructSmogonURL(
                                        pokemon?.Pokemon
                                    )}
                                    drafted={pokemon?.Drafted}
                                    color={color}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PokemonTier
