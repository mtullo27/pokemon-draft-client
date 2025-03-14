import { combineReducers } from "redux"
import pokemonReducer from "./pokemonReducer"
import coachReducer from "./coachReducer"

export default combineReducers({
    pokemon: pokemonReducer,
    coach: coachReducer
})
