import React from "react"
import PokemonPicture from "./PokemonPicture"
import PokemonName from "./PokemonName"

const PokemonCard = ({ pokemon, imageUrl, smogonUrl }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <PokemonPicture imageUrl={imageUrl} altText={pokemon} />
            <PokemonName name={pokemon} smogonUrl={smogonUrl} />
        </div>
    )
}

export default PokemonCard
