import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDetail } from '../../actions/index'
import './cardDetail.css'

export default function CardDetail (props) {
    const dispatch = useDispatch()
    const game = useSelector(state => state.detail)
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    },[dispatch])
    console.log(game)
    return (
        <div className='detail-background'>
            <NavLink to='/videogames'>Back</NavLink>
            {game.mine ?
                <img src={game.image} alt='img not found' height='200px' width='200px'/>
            :
                <img src={game.background_image} alt='img not found' height='200px' width='200px'/>
            }
            <h1>{game.name}</h1>
            {game.genres?.map(e =>
                <h5>{e.name}</h5>
            )}
            {game.mine ?
                <p>{game.release_date.slice(0, -14)}</p>
            :
                <p>{game.released}</p>
            }
            <h5>{game.rating}</h5>
            {game.platforms?.map(e =>
                game.mine ? 
                <h5>{e}</h5>
                : <h5>{e.platform.name}</h5>
            )}
            <p>{game.description}</p>
        </div>
    )
}