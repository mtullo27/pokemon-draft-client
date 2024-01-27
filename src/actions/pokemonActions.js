import axios from "axios"
import { GET_ALL_POKEMON, GET_POKMON_BY_TIER, UPDATE_POKEMON } from "./types"

const backendURL = "http://localhost:5001"

export const getAllPokemon = () => async (dispatch) => {
    try {
        const res = await axios.get(`${backendURL}/pokemon`)
        dispatch({
            type: GET_ALL_POKEMON,
            payload: res.data
        })
    } catch (error) {
        console.error("Error fetching data from server:", error)
    }
}

export const getPokemonByTier = (pts) => async (dispatch) => {
    try {
        const res = await axios.get(`${backendURL}/pokemon/pts/${pts}`)
        dispatch({
            type: GET_POKMON_BY_TIER,
            payload: res.data
        })
    } catch (error) {
        console.error("Error fetching data from server:", error)
    }
}

export const updatePokemon = (id, pokemon) => async (dispatch) => {
    try {
        console.log("pokemon", pokemon)
        const res = await axios.put(`${backendURL}/pokemon/${id}`, pokemon)
        dispatch({
            type: UPDATE_POKEMON,
            payload: res.data
        })
    } catch (error) {
        console.error("Error fetching data from server:", error)
    }
}
