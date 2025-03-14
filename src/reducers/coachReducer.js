import { SET_SPRITE_MODE } from "../actions/coachActions"

const initialState = {
    coachName: null,
    spriteMode: "home" // default
}

export default function coachReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SPRITE_MODE:
            return { ...state, spriteMode: action.payload }
        default:
            return state
    }
}
