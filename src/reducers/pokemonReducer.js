import {
    GET_ALL_POKEMON,
    GET_POKMON_BY_TIER,
    UPDATE_POKEMON
} from "../actions/types"

const initialState = {
    allPokemon: [],
    currentTier: []
}

const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMON:
            return {
                ...state,
                allPokemon: action.payload
            }
        case GET_POKMON_BY_TIER:
            return { ...state, currentTier: action.payload }
        case UPDATE_POKEMON:
            return {
                ...state
            }
        default:
            return state
    }
}

export default pokemonReducer
