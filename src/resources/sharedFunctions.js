export const constructSmogonURL = (pokemonName) => {
    const formattedName = pokemonName?.toLowerCase().replace(" ", "-")
    return `https://www.smogon.com/dex/sv/pokemon/${formattedName}`
}

export const constructPicURL = (pokemonNumber, pokemonName) => {
    const numericPokemonNumber = parseInt(pokemonNumber, 10)
    if (numericPokemonNumber < 1000) {
        const formattedNumber = String(pokemonNumber).padStart(4, "0")
        return `https://projectpokemon.org/images/sprites-models/sv-sprites-home/${formattedNumber}.png`
    } else {
        const formattedName = pokemonName.toLowerCase().replace(" ", "-")
        return `https://www.smogon.com/dex/media/sprites/xy/${formattedName}.gif`
    }
}
