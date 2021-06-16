import axios from 'axios';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_DETAIL = 'GET_DETAIL'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'

export function getVideogames (orderBy, order, name) {
    return async function (dispatch) {
        try {
        if (name) {
            const games = await axios.get(`http://localhost:3001/videogames?name=${name}&orderBy=${orderBy}&order=${order}`)
            dispatch ({
                type: GET_VIDEOGAMES,
                payload: games.data
            })
        } else {
            const games = await axios.get(`http://localhost:3001/videogames?orderBy=${orderBy}&order=${order}`)
            dispatch ({
                type: GET_VIDEOGAMES,
                payload: games.data
            })
        }
        } catch(error) {
            console.log(error)
        }
    }
}

export function getDetail (id) {
    return async function (dispatch) {
        try {
            const gameDetail = await axios.get(`http://localhost:3001/videogames/${id}`)
            console.log(gameDetail.data.name)
            dispatch({
                type: GET_DETAIL,
                payload: gameDetail.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}