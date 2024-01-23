import { GET_ALL_POKEMON, GET_POKMON_BY_TIER } from "../actions/types"

const initialState = {
    allPokemon: [],
    currentTier: []
}

const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMON:
            return { ...state, allPokemon: action.payload }
        case GET_POKMON_BY_TIER:
            return { ...state, currentTier: action.payload }
        default:
            return state
    }
}

export default pokemonReducer
