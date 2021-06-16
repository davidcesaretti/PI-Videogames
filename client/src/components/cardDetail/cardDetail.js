import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDetail } from '../../actions/index'

export default function CardDetail (props) {
    const dispatch = useDispatch()
    const game = useSelector(state => state.detail)
    console.log(props.match.params.id)
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])
    console.log(game)
    return (
/*  [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
[ ] Descripción
[ ] Fecha de lanzamiento
[ ] Rating
[ ] Plataformas */
        <div>
            <h1>{game.name}</h1>
            <img src={game.background_image} alt='img not found' height='200px' width='200px'/>
            {game && game.genres.map((e) => {
                return (
                <h5>{e.name}</h5>
                )
            })}
            <p>{game.description}</p>
            <p>{game.released}</p>
            <h5>{game.rating}</h5>
            {game && game.platforms.map((e) => {
                return (
                <h5>{e.platform.name}</h5>
                )
            })}
            <NavLink to='/videogames'>Back</NavLink>
        </div>
    )
}