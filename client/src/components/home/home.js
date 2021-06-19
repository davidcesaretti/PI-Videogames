import React from 'react'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Card from '../card/card'
import {getVideogames} from '../../actions/index'
import './home.css'
import styled from 'styled-components'

export default function Home () {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('ASC');
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState(0);


    useEffect(() => {
        dispatch(getVideogames(orderBy, order))
        console.log('despachando')
    }, [dispatch, orderBy, order])

    const filteredGames = () => {
        return videogames.slice(currentPage, currentPage + 15)
    }

    const nextPage = () => {
        if (videogames.length < currentPage + 15) {
            setCurrentPage(currentPage)
        } else {
            setCurrentPage(currentPage + 15)
        }
    }

    const prevPage = () => {
        if (currentPage < 14) {
            setCurrentPage(0)
        } else {
            setCurrentPage(currentPage - 15)
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        setCurrentPage(0)
        dispatch(getVideogames(orderBy, order, name))
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
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
        <div className='background'>
            <div>
                <input type="text" placeholder="Search" onChange={(e) => {handleInputChange(e)}} />
                <button onClick={(e) => {handleClick(e)}}>Search</button>
            </div>
            <NavLink to='/create'>Crear Videojuego</NavLink>

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
            <button
                onClick={ prevPage }
            >
                {'<---Prev'}
            </button>
            <button
                onClick={ nextPage }
            >
                {'Next--->'}
            </button>
            {videogames ? filteredGames().map((e) => {
                return (
                        <NavLink to={`/videogames/${e.id}`} key={e.id}>
                            <Card
                                name={e.name}
                                image={e.image}
                                genre={e.genre}
                                key={e.id} />
                        </NavLink>
                        )
                    }) :
                <img src='https://i.pinimg.com/originals/0f/85/75/0f85751bdd6ab068180057ec4638637b.gif' alt='img not found' />
            }
        </div>
    )
}