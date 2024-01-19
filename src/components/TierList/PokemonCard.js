import React from "react"
import PokemonPicture from "./PokemonPicture"
import PokemonName from "./PokemonName"

const PokemonCard = ({
    pokemon,
    imageUrl,
    smogonUrl,
    drafted,
    color,
    team = false
}) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: team
                    ? color
                    : drafted === "x"
                    ? "white"
                    : color
            }}
        >
            <PokemonPicture
                imageUrl={imageUrl}
                altText={pokemon}
                drafted={team ? false : drafted}
            />
            <PokemonName
                name={pokemon}
                smogonUrl={smogonUrl}
                drafted={team ? false : drafted}
            />
        </div>
    )
}

export default PokemonCard
