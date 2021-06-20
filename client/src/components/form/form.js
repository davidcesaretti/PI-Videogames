import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { createGame, getGenres } from '../../actions/index'



export default function Form () {
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

        if(!name){
            alert('Please, insert a name')
            return
        }
        if(!description){
            alert('Please, insert the description of the game')
            return
        }
        if(!platforms){
            alert('Please, insert the platforms where you can play the game')
            return
        }
        if(!rating || rating < 1 || rating > 5){
            alert('Please, the rating must be a number between 1 - 5')
            return
        }

        const game = {
            name: name,
            description: description,
            image: image,
            rating: rating,
            released: released,
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
        <div>
            <NavLink to='/videogames'>Back</NavLink>
            <h1>Form</h1>
            <form  onSubmit={(e) => {handleSubmit(e)} }>
                <div>
                    <label>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => {handleName(e)}}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type='text'
                        name='description'
                        value={description}
                        onChange={(e) => {handleDescription(e)}}
                    />
                </div>
                <div>
                    <label>Date</label>
                    <input
                        type='date'
                        name='released'
                        value={released}
                        onChange={(e) => {handleRelease(e)}}
                    />
                </div>
                <div>
                    <label>Rating</label>
                    <input
                        type='number'
                        name='rating'
                        value={rating}
                        onChange={(e) => {handleRating(e)}}
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input
                        type='text'
                        name='image'
                        value={image}
                        onChange={(e) => {handleImage(e)}}
                    />
                </div>
                <div>
                    {platformsName.map((e, index) => {
                        return (
                            <div key={index}>
                                <input
                                    type='checkbox'
                                    name='platforms'
                                    value={e}
                                    onChange={(e) => {handlePlatforms(e)}}
                                />
                                <label name={e}>{e}</label>
                            </div>
                        )
                    })}
                    {apiGenres.map((e) => {
                        return (
                            <div key={e.id}>
                                <input 
                                    type='checkbox'
                                    name='genres'
                                    value={e.id}
                                    onChange={(e) => {handleGenres(e)}}
                                />
                                <label name={e}>{e.name}</label>
                            </div>
                        )
                    })}
                </div>
                <div>
                </div>
                <button type='submit'>Create Game</button>
            </form>
        </div>
    )
}