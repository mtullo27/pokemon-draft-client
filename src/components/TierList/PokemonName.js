import { Typography } from "@mui/material"
import Link from "@mui/material/Link"
import React from "react"

const PokemonName = ({ name, smogonUrl, drafted }) => {
    const textDecorationStyle = drafted === "x" ? "line-through" : "none"

    return (
        <Typography
            href={smogonUrl}
            target="_blank"
            rel="noopener noreferrer"
            component={Link}
            style={{
                textDecoration: textDecorationStyle,
                color: "inherit"
            }}
        >
            {name}
        </Typography>
    )
}

export default PokemonName
