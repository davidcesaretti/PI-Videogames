import {GET_VIDEOGAMES, GET_DETAIL, CREATE_VIDEOGAME, GET_GENRES} from '../actions/index'

const initialState = {
    videogames: [],
    detail: {},
    genres: [],
    created: []
}

export function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_VIDEOGAMES: {
            return {
                ...state,
                videogames: action.payload
            }
        }
        case GET_DETAIL: {
            console.log(action.payload)
            return {
                ...state,
                detail: action.payload
            }
        }
        case GET_GENRES: {
            return {
                ...state,
                genres: action.payload
            }
        }
        case CREATE_VIDEOGAME: {
            return {
                ...state,
                created: action.payload
            }
        }
        default: {
            return state
        } 
    }
}