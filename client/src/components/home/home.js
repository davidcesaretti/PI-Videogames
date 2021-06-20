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

    const filteredGames = videogames.slice(currentPage, currentPage + 15)
    

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
        setName('')
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
            <div className='navBar'>
                <div className='searchBar'>
                    <input className='inputSearch' type="text" placeholder="Search" onChange={(e) => {handleInputChange(e)}} />
                    <button className='buttonSearch' onClick={(e) => {handleClick(e)}}>Search</button>
                </div>
                <div className='create'>
                <NavLink to='/create'>Crear Videojuego</NavLink>
                </div>
            </div>
            <div className='ctn-orders'>
                <div className='orderBy'>
                    <h5 className='orderName'>Ordenar por</h5>
                    <select className='inputOrder' onChange={(e) => {
                        changeOrderBy(e)
                    }}>
                        <option className='options' value='name'>Name</option>
                        <option className='options' value='rating'>Rating</option>
                    </select>
                </div>
                <div className='order'>
                    <h5 className='orderName'>De forma</h5>
                    <select className='inputOrder' onChange={(e) => {
                        changeOrder(e)
                    }}>
                        <option className='options' value='ASC'>Ascendente</option>
                        <option className='options' value='DESC'>Descendente</option>
                    </select>
                </div>
            </div>
            
            <div className='cards'>
            {filteredGames?.map((e) => (
                            <NavLink className='link' to={`/videogames/${e.id}`} key={e.id}>
                                <Card className='card'
                                    name={e.name}
                                    image={e.image}
                                    genre={e.genre}
                                    genres={e.genres}
                                    key={e.id} />
                            </NavLink>
                            ))
            }
            </div>
            <div className='buttonPag'>
                <button
                    className='prevButton'
                    onClick={ prevPage }
                >
                    {'<'}
                </button>
                <button
                    className='nextButton'
                    onClick={ nextPage }
                >
                    {'>'}
                </button>
            </div>
        </div>
    )
}