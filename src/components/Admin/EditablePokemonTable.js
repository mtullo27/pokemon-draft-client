import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllPokemon, updatePokemon } from "../../actions/pokemonActions"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Paper,
    Typography,
    TablePagination
} from "@mui/material"
import PokemonTableRow from "./PokemonTableRow"

const EditablePokemonTable = () => {
    const dispatch = useDispatch()
    const allPokemon = useSelector((state) => state.pokemon.allPokemon)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(100)
    const [editedValues, setEditedValues] = useState({})

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const slicedPokemon = allPokemon.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    )

    const handleEdit = (index, field, value) => {
        setEditedValues((prevValues) => ({
            ...prevValues,
            [index + page * rowsPerPage]: {
                ...prevValues[index + page * rowsPerPage],
                [field]: value
            }
        }))
    }

    const handleSave = (id, editedPokemon) => {
        console.log("editedPokemon", editedPokemon)
        dispatch(updatePokemon(id, editedPokemon))
        setEditedValues((prevValues) => ({
            ...prevValues,
            [id]: undefined
        }))
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sprite</TableCell>
                            <TableCell>PictureID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Smogon Name</TableCell>
                            <TableCell>Pts</TableCell>
                            <TableCell>CoachID</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slicedPokemon.map((pokemon, index) => (
                            <PokemonTableRow
                                key={index}
                                pokemon={pokemon}
                                onSave={(editedValues) =>
                                    handleSave(pokemon.ID, editedValues)
                                }
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[100, 200, 300]} // You can customize the options
                component="div"
                count={allPokemon.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default EditablePokemonTable
