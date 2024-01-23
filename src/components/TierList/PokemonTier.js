import React from "react"
import { useSelector, useDispatch } from "react-redux"
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
    const allPokemon = useSelector((state) => state.pokemon.allPokemon)

    const constructSmogonURL = (pokemonName) => {
        const formattedName = pokemonName?.toLowerCase().replace(" ", "-")
        return `https://www.smogon.com/dex/sv/pokemon/${formattedName}`
    }
    const constructPicURL = (pokemonNumber, pokemonName) => {
        const numericPokemonNumber = parseInt(pokemonNumber, 10)
        if (numericPokemonNumber < 1000) {
            const formattedNumber = String(pokemonNumber).padStart(4, "0")
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
                        <TableCell align="center" size="small">
                            <Typography variant="h6" fontWeight="bold">
                                {targetPoints} Points
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allPokemon
                        .filter((pokemon) => pokemon.Pts === targetPoints)
                        ?.map((pokemon, index) => (
                            <TableRow
                                key={index}
                                style={{
                                    backgroundColor: pokemon?.CoachID
                                        ? "white"
                                        : color
                                }}
                            >
                                <TableCell size="small">
                                    <PokemonCard
                                        pokemon={pokemon.Pokemon}
                                        imageUrl={constructPicURL(
                                            pokemon?.PokemonID,
                                            pokemon?.SmogonName
                                        )}
                                        smogonUrl={constructSmogonURL(
                                            pokemon?.Pokemon
                                        )}
                                        drafted={
                                            pokemon?.CoachID ? true : false
                                        }
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
