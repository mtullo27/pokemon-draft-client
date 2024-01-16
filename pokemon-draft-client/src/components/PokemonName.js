import { Typography } from "@mui/material"
import React from "react"

const PokemonName = ({ name, smogonUrl }) => {
    return (
        <Typography
            href={smogonUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                textDecoration: "none",
                color: "inherit"
            }}
        >
            {name}
        </Typography>
    )
}

export default PokemonName
