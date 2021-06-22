import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { createGame, getGenres } from '../../actions/index'
import './form.css'
import logo from '../../img/image2.png'
import sonic from '../../img/sonic.jpg'



export default function Form() {
    const dispatch = useDispatch()
    const history = useHistory()
    const apiGenres = useSelector(state => state.genres)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [released, setReleased] = useState('')
    const [rating, setRating] = useState(0)
    const [genres, setGenres] = useState([])
    const [platforms, setPlatforms] = useState([])

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            alert('Please, insert a name')
            return
        }
        if (!description) {
            alert('Please, insert the description of the game')
            return
        }
        if (!platforms) {
            alert('Please, insert the platforms where you can play the game')
            return
        }
        if (!rating || rating < 1 || rating > 5) {
            alert('Please, the rating must be a number between 1 - 5')
            return
        }

        const game = {
            name: name,
            description: description,
            image: image,
            rating: rating,
            release_date: released,
            platforms: platforms,
            genres: genres
        }
        console.log(game)

        dispatch(createGame(game))
        e.target.reset()

        setName('')
        setDescription('')
        setImage('')
        setRating(0)
        setReleased('')
        setPlatforms([])
        setGenres([])

        alert('Your game was created successfully!')
        history.push('/videogames')
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleImage = (e) => {
        setImage(e.target.value)
    }

    const handleRelease = (e) => {
        setReleased(e.target.value)
    }

    const handleRating = (e) => {
        setRating(e.target.value)
    }

    const handlePlatforms = (e) => {
        setPlatforms(platforms.concat(e.target.value))
    }

    const handleGenres = (e) => {
        setGenres(genres.concat(e.target.value))
    }



    const platformsName = ['PlayStation 4', 'PlayStation 5', 'PC', 'Xbox', 'PS Vita', 'Android', 'iOS', 'macOS']

    return (
        <div className='ctn-body-form'>
            <div>
                <NavLink className='rechargeHome' to='/videogames'>
                    <img className='logo-form' src={logo} alt='logo not found' />
                </NavLink>
            </div>
            <div className='navBar-form'>
                <NavLink className='backHome' to='/videogames'>Back</NavLink>
                <h1 className='title-form'>Create your own videogame!</h1>
            </div>
            <form className='body-form' onSubmit={(e) => { handleSubmit(e) }}>
                <div className='form-sonic'>
                    <div className='ctn-genres'>
                        <h4 className='title-genres'>Genres<span> *</span></h4>
                        {apiGenres.map((e) => {
                            return (
                                <div className='ctn-box-genres' key={e.id}>
                                    <input
                                        className='checkbox-genres'
                                        type='checkbox'
                                        name='genres'
                                        value={e.id}
                                        onChange={(e) => { handleGenres(e) }}
                                    />
                                    <label className='label-genres' name={e}>{e.name}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div className='ctn-inputs'>
                        <div className='ctn-form'>
                            <div className='option-form'>
                                <label className='label-form'>Name<span> *</span></label>
                                <input
                                    className='input-form'
                                    type='text'
                                    name='name'
                                    value={name}
                                    onChange={(e) => { handleName(e) }}
                                />
                            </div>
                        </div>
                        <div className='ctn-form'>
                            <div className='option-form'>
                                <label className='label-form'>Description<span> *</span></label>
                                <input
                                    className='input-form'
                                    type='text'
                                    name='description'
                                    value={description}
                                    onChange={(e) => { handleDescription(e) }}
                                />
                            </div>
                        </div>
                        <div className='ctn-form-date'>
                            <div className='option-form-date'>
                                <label className='label-form-date'>Date<span> *</span></label>
                                <input
                                    className='input-form-date'
                                    type='date'
                                    name='released'
                                    value={released}
                                    onChange={(e) => { handleRelease(e) }}
                                />
                            </div>
                        </div>
                        <div className='ctn-form'>
                            <div className='option-form'>
                                <label className='label-form'>Rating<span> *</span></label>
                                <input
                                    className='input-form'
                                    type='number'
                                    name='rating'
                                    value={rating}
                                    onChange={(e) => { handleRating(e) }}
                                />
                            </div>
                        </div>
                        <div className='ctn-form'>
                            <div className='option-form'>
                                <label className='label-form'>Image</label>
                                <input
                                    className='input-form'
                                    type='text'
                                    name='image'
                                    value={image}
                                    onChange={(e) => { handleImage(e) }}
                                />
                            </div>
                        </div>
                        <button className='button-create' type='submit'>Create Game</button>
                    </div>
                    <div className='ctn-checkbox'>
                        <div className='ctn-platforms'>
                            <h4 className='title-platforms'>Platforms<span> *</span></h4>
                            {platformsName.map((e, index) => {
                                return (
                                    <div className='ctn-box-platforms' key={index}>
                                        <input
                                            className='checkbox-platforms'
                                            type='checkbox'
                                            name='platforms'
                                            value={e}
                                            onChange={(e) => { handlePlatforms(e) }}
                                        />
                                        <label className='label-platforms' name={e}>{e}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                
            </form>
        </div>
    )
}