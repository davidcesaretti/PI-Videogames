import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { filter, getDetail } from '../../actions/index'
import './cardDetail.css'
import logo from '../../img/image2.png'

export default function CardDetail(props) {
    const dispatch = useDispatch()
    const game = useSelector(state => state.detail)
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])
    console.log(game)
    return (
        <div className='detail-background'>
                <div>
                    <NavLink className='rechargeHome' to='/videogames'>
                        <img className='logo-detail' src={logo} alt='logo not found'/>
                    </NavLink>
                </div>
            <div className='navBar-detail'>
                <h1 className='detailName'>{game.name}</h1>
                <NavLink className='backHome' to='/videogames'>Back</NavLink>
            </div>
            <div className='ctn-detail'>
                {game.mine ?
                    <img className='detailImg' src={game.image} alt='img not found' />
                    :
                    <img className='detailImg' src={game.background_image} alt='img not found' />
                }
                <div className='ctn-genre'>
                    <h4 className='title-genre'>Genres</h4>
                    {game.genres?.map(e =>
                        <p className='detailGenres'>{e.name}</p>
                    )}
                </div>
                <div className='ctn-release'>
                    <h4 className='title-release'>Release Date</h4>
                    {game.mine ?
                        <p className='detailRelease'>{game.release_date.slice(0, -14)}</p>
                        :
                        <p className='detailRelease'>{game.released}</p>
                    }
                </div>
                <div className='ctn-rating'>
                    <h4 className='title-rating'>Rating</h4>
                    <p className='detailRating'>{game.rating}</p>
                </div>
                <div className='ctn-platforms'>
                    <h4 className='title-platforms'>Platforms</h4>
                    {game.platforms?.map(e =>
                        game.mine ?
                            <p className='detailPlatforms'>{e}</p>
                            : <p className='detailPlatforms'>{e.platform.name}</p>
                    )}
                </div>
            </div>
            <div className='ctn-description'>
                <h4 className='title-description'>Description</h4>
                {!game.mine ? <p className='detailDescription'>{game.description_raw}</p>
                :
                <p className='detailDescription'>{game.description}</p>}
            </div>
        </div>
    )
}