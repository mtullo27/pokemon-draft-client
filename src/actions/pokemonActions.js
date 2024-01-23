import axios from "axios"
import { GET_ALL_POKEMON, GET_POKMON_BY_TIER } from "./types"

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
        console.log(res.data)
        dispatch({
            type: GET_POKMON_BY_TIER,
            payload: res.data
        })
    } catch (error) {
        console.error("Error fetching data from server:", error)
    }
}
