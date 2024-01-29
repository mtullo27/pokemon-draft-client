import React, { useState, useEffect } from "react"
import { TableRow, TableCell, TextField, Button } from "@mui/material"
import PokemonPictureSmall from "../TierList/PokemonPictureSmall"
import { constructPicURL } from "../../resources/sharedFunctions"

const PokemonTableRow = ({ pokemon, onSave }) => {
    const [editedValues, setEditedValues] = useState({})
    const [picURL, setPicURL] = useState(
        constructPicURL(pokemon?.PokemonID, pokemon?.SmogonName)
    )

    //useEffect constructs the image url and will update whenever the pokemonID changes
    useEffect(() => {
        setPicURL(constructPicURL(pokemon?.PokemonID, pokemon?.SmogonName))
    }, [editedValues, pokemon])

    const handleEdit = (field, value) => {
        setEditedValues((prevValues) => ({
            ...prevValues,
            [field]: value
        }))
    }

    const handleSave = () => {
        onSave(editedValues)
        setPicURL(constructPicURL(editedValues.PokemonID, pokemon?.SmogonName))
    }

    return (
        <TableRow>
            <TableCell>
                <PokemonPictureSmall imageUrl={picURL} />
            </TableCell>
            <TableCell>
                <TextField
                    value={editedValues.PokemonID || pokemon.PokemonID}
                    onChange={(e) => handleEdit("PokemonID", e.target.value)}
                />
            </TableCell>
            <TableCell size="small">
                <TextField
                    value={editedValues.Pokemon || pokemon.Pokemon}
                    onChange={(e) => handleEdit("Pokemon", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <TextField
                    value={editedValues.SmogonName || pokemon.SmogonName}
                    onChange={(e) => handleEdit("SmogonName", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <TextField
                    value={editedValues.Pts || pokemon.Pts}
                    onChange={(e) => handleEdit("Pts", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <TextField
                    value={editedValues.CoachID || pokemon.CoachID}
                    onChange={(e) => handleEdit("CoachID", e.target.value)}
                />
            </TableCell>
            <TableCell>
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default PokemonTableRow
