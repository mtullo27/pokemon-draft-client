import React from "react"
import PokemonTier from "./PokemonTier"
import { Grid, Paper, Container, Typography } from "@mui/material"
import "./PokemonTiersContainer.css" // Import the CSS file

const PokemonTiersContainer = () => {
    const tiers = [...Array(19).keys()].reverse()

    return (
        <div
            style={{
                overflowX: "auto",
                overflowY: "hidden",
                textAlign: "center"
            }}
        >
            <Typography variant="h4" component="div" gutterBottom>
                Pokemon Tiers
            </Typography>
            <Container
                maxWidth="xl"
                className="pokemon-tiers-scroll-container"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    overflowX: "auto",
                    overflowY: "hidden"
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
                            style={{ minWidth: "15vw" }}
                        >
                            <PokemonTier targetPoints={tier + 1} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default PokemonTiersContainer
