import React from "react"
import TeamBoxHorizontal from "../Teams/TeamBoxHorizontal"
import PokemonTiersContainer from "../TierList/PokemonTiersContainer"
import { Typography, Container, Paper } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        padding: theme.spacing(4)
    },
    header: {
        marginBottom: theme.spacing(4)
    },
    container: {
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        overflowY: "auto",
        maxHeight: "70vh",
        minWidth: "99vw",
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }
}))

const UserPage = ({ match }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Container maxWidth="xl" className="pokemon-tiers-scroll-container">
                <TeamBoxHorizontal coach={"Tullo"} color={"#8A66FF"} />
            </Container>
            <br />
            <PokemonTiersContainer />
        </div>
    )
}

export default UserPage
