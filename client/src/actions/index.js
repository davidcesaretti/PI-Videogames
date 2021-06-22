import axios from 'axios';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const GET_DETAIL = 'GET_DETAIL'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const GET_GENRES = 'GET_GENRES'
export const FILTER = 'FILTER'

export function getVideogames(orderBy, order, name, filterOrigin, filterGenre,) {
    return async function (dispatch) {
        try {
            if (orderBy === 'default') orderBy = 'id'
            if (name) {
                const gamesNamed = await axios.get(`http://localhost:3001/videogames?game=${name}&orderBy=${orderBy}&order=${order}`)
                dispatch({
                    type: GET_VIDEOGAMES,
                    payload: gamesNamed.data
                })
            } else {
                const games = await axios.get(`http://localhost:3001/videogames?orderBy=${orderBy}&order=${order}`)
                
                //inicio filtrados

                if (filterOrigin === 'All' && filterGenre === 'All') {
                    dispatch({
                        type: GET_VIDEOGAMES,
                        payload: games.data
                    })
                } else if (filterOrigin === 'creados') {
                    let filteredGames = games.data.filter(e => e.mine)
                    if (filterGenre !== 'All') {
                        const doubleFiltered = filteredGames.filter((e) => { return e.genres.some((a) => a.name === filterGenre) })
                        dispatch({
                            type: GET_VIDEOGAMES,
                            payload: doubleFiltered
                        })
                    } else {
                        dispatch({
                            type: GET_VIDEOGAMES,
                            payload: filteredGames
                        })
                    }
                } else if (filterOrigin === 'api') {
                    let filteredGames = games.data.filter(e => !e.mine)
                    if (filterGenre !== 'All') {
                        const doubleFiltered = filteredGames.filter((e) => {
                            return e.genre.some((a) => a === filterGenre) })
                        dispatch({
                            type: GET_VIDEOGAMES,
                            payload: doubleFiltered
                        })
                    } else {
                        dispatch({
                            type: GET_VIDEOGAMES,
                            payload: filteredGames
                        })
                    }

                    //filtrado unicamente por genero

                } else if (filterGenre !== 'All') {
                    let filteredByGenre = games.data.filter((e) => {
                        if (e.mine) {
                            return e.genres.some((a) => a.name === filterGenre)
                        } else {
                            return e.genre.some((a) => a === filterGenre)
                        }
                    })
                    dispatch({
                        type: GET_VIDEOGAMES,
                        payload: filteredByGenre
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function getGenres() {
    return async function (dispatch) {
        try {
            const genres = await axios.get(`http://localhost:3001/genres`)
            dispatch({
                type: GET_GENRES,
                payload: genres.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            const gameDetail = await axios.get(`http://localhost:3001/videogames/${id}`)
            console.log(gameDetail.data.name + ' asdas')
            dispatch({
                type: GET_DETAIL,
                payload: gameDetail.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function createGame(game) {
    return async function () {
        try {
            await axios.post("http://localhost:3001/videogames/post", game)
        } catch (error) {
            console.log(error)
        }
    }
}
export function filter(value) {
    return async function (dispatch) {
        dispatch({
            type: FILTER,
            payload: value
        })
    }
}
