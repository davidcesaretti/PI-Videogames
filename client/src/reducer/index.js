import {GET_VIDEOGAMES, GET_DETAIL, CREATE_VIDEOGAME} from '../actions/index'

const initialState = {
    videogames: [],
    detail: []
}

export function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_VIDEOGAMES: {
            console.log(action.payload)
            return {
                ...state,
                videogames: action.payload
            }
        }
        case GET_DETAIL: {
            return {
                ...state,
                detail: action.payload
            }
        }
        default: {
            return state
        } 
    }
}