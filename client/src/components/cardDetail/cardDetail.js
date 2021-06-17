import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDetail } from '../../actions/index'

export default function CardDetail (props) {
    const dispatch = useDispatch()
    const game = useSelector(state => state.detail)
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])
    console.log(game)
    return (
        <div>
            <NavLink to='/videogames'>Back</NavLink>
            <h1>{game.name}</h1>
            <img src={game.background_image} alt='img not found' height='200px' width='200px'/>
            {game.genres?.map(e =>
                <h5>{e.name}</h5>
            )}
            <p>{game.description}</p>
            <p>{game.released}</p>
            <h5>{game.rating}</h5>
            {game.platforms?.map(e =>
                <h5>{e.platform.name}</h5>
            )}
        </div>
    )
}