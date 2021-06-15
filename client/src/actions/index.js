import axios from 'axios';
import { BASE_URL } from '../constants'
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_DETAIL = 'GET_DETAIL'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'

export function getVideogames (page, order, orderBy, name) {
    return async function (dispatch) {
        console.log('hola')
        try {
        if (name) {
            const games = await axios.get('http://localhost:3001/videogames?game=k&page=0&orderBy=name&order=asc')
            /* await axios.get(`${BASE_URL}?name=${name}&page=${page}&orderBy=${orderBy}&order=${order}`) */
            console.log(games.data[0])
            dispatch ({
                type: GET_VIDEOGAMES,
                payload: games.data
            })
        } else {
            console.log('gaea')
            const games = await axios.get('http://localhost:3001/videogames?game=k&page=0&orderBy=name&order=asc')
            /* const games = await axios.get(`${BASE_URL}?page=${page}&orderBy=${orderBy}&order=${order}`) */
            console.log(games.data)
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
            const gameDetail = await axios.get(`${BASE_URL}/${id}`)
            dispatch({
                type: GET_DETAIL,
                payload: gameDetail.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}