import React from 'react'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Card from '../card/card'
import SearchBar from '../searchBar/searchBar'
import {getVideogames, getVideogamesByName} from '../../actions/index'
import './home.css'
import styled from 'styled-components'

export default function Home () {
    const dispatch = useDispatch()
    const videogames = useSelector(state => state.videogames)
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('ASC')
    const [name, setName] = useState('')


    useEffect(() => {
        dispatch(getVideogames(orderBy, order))
        console.log('despachando')
    }, [dispatch, orderBy, order])


    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getVideogames(orderBy, order, name))
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    /* const prev = (e) => {
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
    } */

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
            {videogames ? videogames.map((e) => {
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
            {/* <button onClick={(e) => {prev(e)}}>
                {'<---Prev'}
            </button>
            <button onClick={(e) => {next(e)}}>
                {'Next--->'}
            </button> */}
        </div>
    )
}