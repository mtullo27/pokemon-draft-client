import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import PokemonTier from "./PokemonTier"
import { Grid, Paper, Container, Typography } from "@mui/material"
import "./PokemonTiersContainer.css" // Import the CSS file
import { getAllPokemon } from "../../actions/pokemonActions"

const PokemonTiersContainer = () => {
    const dispatch = useDispatch()
    const pokemon = useSelector((state) => state.allPokemon)

    const tiers = [...Array(19).keys()].reverse()

    const getRainbowColor = (index) => {
        const frequency = 0.5 // Adjust this value for a smoother or more vibrant rainbow
        const red = Math.sin(frequency * (255 - index) + 0) * 127 + 128
        const green = Math.sin(frequency * (255 - index) + 2) * 127 + 128
        const blue = Math.sin(frequency * (255 - index) + 4) * 127 + 128
        return `rgb(${red}, ${green}, ${blue})`
    }
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
                <Grid container spacing={2} style={{ flexWrap: "nowrap" }}>
                    {tiers.map((tier, index) => (
                        <Grid
                            item
                            key={index + 1}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={2}
                            style={{
                                minWidth: "15vw"
                            }}
                        >
                            <PokemonTier
                                targetPoints={tier + 1}
                                color={getRainbowColor(index)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default PokemonTiersContainer
