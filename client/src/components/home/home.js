import React from 'react'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Card from '../card/card'
import {getVideogames, getGenres, filter} from '../../actions/index'
import style from './home.module.css'
import logo from '../../img/image2.png'

export default function Home () {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);
    const dbGenres = useSelector(state => state.genres)
    const [orderBy, setOrderBy] = useState('default');
    const [order, setOrder] = useState('ASC');
    const [name, setName] = useState('');
    const [filterOrigin, setFilterOrigin] = useState('All')
    const [filterGenre, setFilterGenre] = useState('All')
    const [currentPage, setCurrentPage] = useState(0);
    const [phantasm, setPhantasm] = useState('')

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    useEffect(() => {
        dispatch(getVideogames(orderBy, order, phantasm, filterOrigin, filterGenre))
        console.log('despachando')
    }, [dispatch, orderBy, order, filterOrigin, filterGenre])

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
            setName(e.target.value)
    }

    const pressEnter = (e) => {
        if(e.key === 'Enter') {
            setCurrentPage(0)
            dispatch(getVideogames(orderBy, order, name))
            setName('')
        }
        e.target.reset()
    }

    const changeOrder = (e) => {
        setCurrentPage(0)
        setOrder(e.target.value)
    }

    const changeOrderBy = (e) => {
        setCurrentPage(0)
        setOrderBy(e.target.value)
    }

    const changeFilterOrigin = (e) => {
        setCurrentPage(0)
        setFilterOrigin(e.target.value)
    }

    const changeFilterGenre = (e) => {
        setCurrentPage(0)
        setFilterGenre(e.target.value)
    }

    //Boton de ir hacia arriba

    const scrollUp = () => {
        let currentScroll = document.documentElement.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(scrollUp)
            window.scrollTo (0, currentScroll - (currentScroll / 10));
        }
    }

    const buttonUp = document.getElementById("buttonUp")

    window.onscroll = () => {
        let scroll = document.documentElement.scrollTop;
        if (scroll > 700){
            buttonUp.style.transform = "scale(1)"
        } else {
            buttonUp.style.transform = "scale(0)"
        }
    }

    return (
        <div className={style.background}>
                <div>
                    <a className={style.rechargeHome} href='http://localhost:3000/videogames'>
                        <img className={style.logo} src={logo} alt='logo not found' />
                    </a>
                </div>
            <div className={style.navBar}>
                <form className={style.searchBar}  onSubmit={(e) => {pressEnter(e)}}>
                    <input  className={style.inputSearch}
                            type="text"
                            value={name}
                            onChange={(e) => {handleInputChange(e)}}
                    />
                    <input  className={style.buttonSearch}
                            type="submit"
                            value="Search"
                            onClick={(e) => {handleClick(e)}}
                    />
                </form>
                <div className={style.create}>
                <NavLink className={style.createLink} to='/create'>Create videogame</NavLink>
                </div>
            </div>
            <div className={style.ctnOrders}>
                <div className={style.orderBy}>
                    <h5 className={style.orderName}>Order By</h5>
                    <select className={style.inputOrder} onChange={(e) => {
                        changeOrderBy(e)
                    }}>
                        <option className={style.options} value='default'>Default</option>
                        <option className={style.options} value='name'>Name</option>
                        <option className={style.options} value='rating'>Rating</option>
                    </select>
                </div>
                <div className={style.order}>
                    <h5 className={style.orderName}>In Order</h5>
                    <select className={style.inputOrder} onChange={(e) => {
                        changeOrder(e)
                    }}>
                        <option className={style.options} value='ASC'>Crescent</option>
                        <option className={style.options} value='DESC'>Decrescent</option>
                    </select>
                </div>
                <div className={style.filter}>
                    <h5 className={style.orderName}>Filter Origin</h5>
                    <select className={style.inputOrder} onChange={(e) => {
                        changeFilterOrigin(e)
                    }}>
                        <option className={style.options} value='All'>All</option>
                        <option className={style.options} value='creados'>Created</option>
                        <option className={style.options} value='api'>Api</option>
                    </select>
                </div>
                <div className={style.filter}>
                    <h5 className={style.orderName}>Filter Genre</h5>
                    <select className={style.inputOrder} onChange={(e) => {
                        changeFilterGenre(e)
                    }}>
                        <option className={style.options} value='All'>All</option>
                        {dbGenres?.map((e) => (
                            <option className={style.options} value={e.name}>{`${e.name}`}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={style.cards}>
            {filteredGames?.map((e) => (
                            <NavLink className={style.link} to={`/videogames/${e.id}`} key={e.id}>
                                <Card className={style.card}
                                    name={e.name}
                                    image={e.image}
                                    genre={e.genre}
                                    genres={e.genres}
                                    key={e.id} />
                            </NavLink>
                            ))
            }
            </div>
            { videogames.length > 15 ? <div className={style.buttonPag}>
                {currentPage !== 0 ? <button
                    className={style.prevButton}
                    onClick={ prevPage }
                >
                    {'<'}
                </button> : <div></div>}
                {currentPage !== 90 ? <button
                    className={style.nextButton}
                    onClick={ nextPage }
                >
                    {'>'}
                </button> : <div></div> }
            </div> : <div></div> }
                <div>
                    <button className={style.upButton} id="buttonUp" onClick={ scrollUp }>
                        {'^'}
                    </button>
                </div>
        </div>
    )
}