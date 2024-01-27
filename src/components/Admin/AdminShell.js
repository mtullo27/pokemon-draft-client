import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import EditablePokemonTable from "./EditablePokemonTable"
import { Grid, Paper, Container, Typography } from "@mui/material"
import { getAllPokemon } from "../../actions/pokemonActions"

const AdminShell = () => {
    const dispatch = useDispatch()
    const pokemon = useSelector((state) => state.allPokemon)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllPokemon())
            } catch (error) {
                console.error("Error fetching data from server:", error)
            }
        }

        fetchData()
    }, [dispatch, pokemon?.length])
    return (
        <div
            style={{
                overflowX: "auto",
                overflowY: "hidden",
                textAlign: "center"
            }}
        >
            <Container
                maxWidth="xl"
                className="pokemon-tiers-scroll-container"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    overflowX: "scroll",
                    overflowY: "scroll",
                    maxHeight: "90vh",
                    minWidth: "99vw"
                }}
            >
                <EditablePokemonTable />
            </Container>
        </div>
    )
}

export default AdminShell
