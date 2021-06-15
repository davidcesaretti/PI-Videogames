import React from 'react'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Card from '../card/card'
import SearchBar from '../searchBar/searchBar'
import {getVideogames} from '../../actions/index'

export default function Home () {
    const dispatch = useDispatch()
    const videogames = useSelector(state => state.videogames)
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('ASC')

    useEffect(() => {
        dispatch(getVideogames(page, orderBy, order))
        console.log('despachando')
    }, [dispatch, page, orderBy, order])

    console.log(videogames)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getVideogames(page, orderBy, order))
    }

    const prev = (e) => {
        e.preventDefault()
        if (page <= 0) {
            setPage(0)
        } else {
            setPage(page - 15)
        }
    }

    const next = (e) => {
        e.preventDefault()
        if (videogames.length < 15) {
            return;
        } else {
            setPage(page + 15)
        }
    }

    const changeOrder = (e) => {
        e.preventDefault()
        setOrder(e.target.value)
    }

    const changeOrderBy = (e) => {
        e.preventDefault()
        setOrderBy(e.target.value)
    }

    return (
        <div>
            <NavLink to='/create'>Crear Videojuego</NavLink>
            <button onClick={(e) => {
                handleClick(e)
            }}>HOME</button>

            <SearchBar />

            <div>
                <h5>Ordenar por</h5>
                <select onChange={(e) => {
                    changeOrderBy(e)
                }}>
                    <option value='name'>Name</option>
                    <option value='rating'>Rating</option>
                </select>

                <h5>Ordenar de forma</h5>
                <select onChange={(e) => {
                    changeOrder(e)
                }}>
                    <option value='ASC'>Ascendente</option>
                    <option value='DESC'>Descendente</option>
                </select>
            </div>
            
            {videogames?.map((e) => {
                return (
                    <fragment>
                        <NavLink to={`/videogames/${e.id}`}>
                            <Card name={e.name} image={e.image} key={e.id} />
                        </NavLink>
                    </fragment>
                )
            })}
            <button onClick={(e) => {prev(e)}}>
                {'<---Prev'}
            </button>
            <button onClick={(e) => {next(e)}}>
                {'Next--->'}
            </button>
        </div>
    )
}