import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { filter, getDetail } from '../../actions/index'
import style from './cardDetail.module.css'
import logo from '../../img/image2.png'

export default function CardDetail(props) {
    const dispatch = useDispatch()
    const game = useSelector(state => state.detail)
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])
    console.log(game)
    return (
        <div className={style.detailBackground}>
                <div>
                    <NavLink className={style.rechargeHome} to='/videogames'>
                        <img className={style.logoDetail} src={logo} alt='logo not found'/>
                    </NavLink>
                </div>
            <div className={style.navBarDetail}>
                <h1 className={style.detailName}>{game.name}</h1>
                <NavLink className={style.backHome} to='/videogames'>Back</NavLink>
            </div>
            <div className={style.ctnDetail}>
                {game.mine ?
                    <img className={style.detailImg} src={game.image} alt='img not found' />
                    :
                    <img className={style.detailImg} src={game.background_image} alt='img not found' />
                }
                <div className={style.ctnGenre}>
                    <h4 className={style.titleGenre}>Genres</h4>
                    {game.genres?.map(e =>
                        <p className={style.detailGenres}>{e.name}</p>
                    )}
                </div>
                <div className={style.ctnRelease}>
                    <h4 className={style.titleRelease}>Release Date</h4>
                    {game.mine ?
                        <p className={style.detailRelease}>{game.release_date.slice(0, -14)}</p>
                        :
                        <p className={style.detailRelease}>{game.released}</p>
                    }
                </div>
                <div className={style.ctnRating}>
                    <h4 className={style.titleRating}>Rating</h4>
                    <p className={style.detailRating}>{game.rating}</p>
                </div>
                <div className={style.ctnPlatforms}>
                    <h4 className={style.titlePlatforms}>Platforms</h4>
                    {game.platforms?.map(e =>
                        game.mine ?
                            <p className={style.detailPlatforms}>{e}</p>
                            : <p className={style.detailPlatforms}>{e.platform.name}</p>
                    )}
                </div>
            </div>
            <div className={style.ctnDescription}>
                <h4 className={style.titleDescription}>Description</h4>
                {!game.mine ? <p className={style.detailDescription}>{game.description_raw}</p>
                :
                <p className={style.detailDescription}>{game.description}</p>}
            </div>
        </div>
    )
}