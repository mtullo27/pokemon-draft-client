import React from "react"
import PokemonTier from "./PokemonTier"
import "./PokemonTiersContainer.css" // Import the CSS file

const PokemonTiersContainer = () => {
    const tiers = [...Array(19).keys()].reverse()

    return (
        <div className="pokemon-tiers-container">
            {tiers.map((tier, index) => (
                <PokemonTier key={index + 1} targetPoints={tier + 1} />
            ))}
        </div>
    )
}

export default PokemonTiersContainer
