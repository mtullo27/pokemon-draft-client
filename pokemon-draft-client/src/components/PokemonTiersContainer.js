import React from "react"
import PokemonTier from "./PokemonTier"
import { Grid } from "@mui/material"
import "./PokemonTiersContainer.css" // Import the CSS file

const PokemonTiersContainer = () => {
    const tiers = [...Array(19).keys()].reverse()

    return (
        <Grid container spacing={2} className="pokemon-tiers-container">
            {tiers.map((tier, index) => (
                <Grid item key={index + 1} xs={12} sm={6} md={4} lg={2}>
                    <PokemonTier targetPoints={tier + 1} />
                </Grid>
            ))}
        </Grid>
    )
}

export default PokemonTiersContainer
