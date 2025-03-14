import axios from "axios"
import { Pokedex } from "./pokedex.js"

// Simple in-memory cache: { [nameOrId + spriteMode]: <spriteURL> }
const spriteCache = {}

// Utility function that replaces all whitespace characters with a hyphen
function replaceSpaces(str) {
    // The regular expression /\s+/g matches one or more whitespace characters globally
    return str.replace(/\s+/g, "-")
}

export function convertCamelToSpaces(text) {
    let spacedText = ""
    for (let i = 0; i < text.length; i++) {
        if (
            text[i] === text[i].toUpperCase() &&
            i !== 0 &&
            i !== text.length - 1 &&
            text[i - 1] !== " " &&
            text[i + 1] !== " " &&
            !/[A-Z]/.test(text[i - 1]) &&
            !/[A-Z]/.test(text[i + 1])
        ) {
            spacedText += " " + text[i].toLowerCase()
        } else {
            spacedText += text[i]
        }
    }
    return spacedText.trim().replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Use PokeAPI to fetch the sprite for a given Pokémon and style.
 *
 * @param {string|number} pokemonNameOrId - e.g. "bulbasaur", "charizard", "mewtwo"
 * @param {"official"|"home"|"dream-world"|"original"|"shiny"} spriteMode - which sprite to retrieve
 * @returns {string|null} The sprite URL or null if an error occurs
 */
export async function fetchPokemonSprite(
    pokemonNameOrId,
    spriteMode = "official"
) {
    if (!pokemonNameOrId) return null

    //replace -m or -f with -male and -female respectively
    pokemonNameOrId = pokemonNameOrId.replace(/-(m|f)\b/g, (_, gender) => {
        return gender === "m" ? "-male" : "-female"
    })

    const pokeApiKey = replaceSpaces(String(pokemonNameOrId).toLowerCase())
    const cacheKey = `${pokeApiKey}_${spriteMode}`

    if (spriteCache[cacheKey]) return spriteCache[cacheKey]

    try {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokeApiKey}`
        )
        const data = response.data

        let spriteUrl = null
        // Determine the sprite URL based on the selected style
        switch (spriteMode) {
            case "home":
                spriteUrl = data.sprites?.other?.home?.front_default
                break
            case "dream-world":
                spriteUrl = data.sprites?.other?.["dream-world"]?.front_default
                break
            case "official":
                spriteUrl =
                    data.sprites?.other?.["official-artwork"]?.front_default ||
                    data.sprites?.front_default
                break
            case "original":
                spriteUrl = data.sprites?.front_default
                break
            case "shiny":
                spriteUrl =
                    data.sprites?.other?.["official-artwork"]?.front_shiny ||
                    data.sprites?.front_shiny
                break
            default:
                spriteUrl =
                    data.sprites?.other?.["official-artwork"]?.front_default ||
                    data.sprites?.front_default
        }

        spriteCache[cacheKey] = spriteUrl
        return spriteUrl
    } catch (err) {
        console.error("Error fetching sprite from PokeAPI:", err)
        return null
    }
}

export const constructSmogonURL = (pokemonName) => {
    const formattedName = pokemonName?.toLowerCase().replace(" ", "-")
    return `https://www.smogon.com/dex/sv/pokemon/${formattedName}`
}

/**
 * Look up a Pokémon’s local sprite using the Pokédex.
 * The function accepts either a Pokémon name (case-insensitive)
 * or a numeric id. It returns the relative path for the sprite image
 * based on the selected spriteMode.
 *
 * @param {string|number} pokemonNameOrId - e.g. "bulbasaur" or 1
 * @param {"official"|"home"|"dream-world"|"original"} spriteMode - which sprite to retrieve
 * @returns {string|null} The local sprite URL or null if not found
 */
export const getLocalSprite = (pokemonNameOrId, spriteMode = "official") => {
    let entry

    // If pokemonNameOrId is numeric (or numeric string), search by id
    if (typeof pokemonNameOrId === "number" || /^\d+$/.test(pokemonNameOrId)) {
        const id = Number(pokemonNameOrId)
        entry = Object.values(Pokedex).find((p) => p.num === id)
    } else {
        entry = Pokedex[pokemonNameOrId.toLowerCase()]
    }

    if (!entry) return null

    // Build the identifier used in the sprite file name.
    let spriteId = entry.num
    if (entry.forme) {
        spriteId = `${entry.baseSpecies.toLowerCase()}-${entry.forme.toLowerCase()}`
    }

    // Return the local sprite path based on the selected sprite mode.
    switch (spriteMode) {
        case "home":
            return `/sprites/pokemon/other/home/${spriteId}.png`
        case "dream-world":
            return `/sprites/pokemon/other/dream-world/${spriteId}.svg`
        case "official":
            return `/sprites/pokemon/other/official-artwork/${spriteId}.png`
        case "original":
            return `/sprites/pokemon/${spriteId}.png`
        default:
            return `/sprites/pokemon/other/official-artwork/${spriteId}.png`
    }
}

/**
 * Get a Pokémon's sprite using a two-step approach:
 * 1. Try to obtain the sprite locally.
 * 2. If that fails, fetch it using the PokeAPI.
 *
 * @param {string|number} pokemonNameOrId - The Pokémon name or id.
 * @param {"official"|"home"|"dream-world"|"original"|"shiny"} spriteMode - Selected sprite style.
 * @returns {Promise<string|null>} The sprite URL or null if unavailable.
 */
export async function getSpriteFallback(
    pokemonNameOrId,
    spriteMode = "official"
) {
    const localSprite = getLocalSprite(pokemonNameOrId, spriteMode)
    if (localSprite) return localSprite

    // Fall back to the API call if no local sprite is found.
    return await fetchPokemonSprite(pokemonNameOrId, spriteMode)
}
