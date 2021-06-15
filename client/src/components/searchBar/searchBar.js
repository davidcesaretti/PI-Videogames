import React from 'react'
import {getVideogames} from '../../actions/index'
import {useState} from 'react'
import {useDispatch} from 'react-redux'

export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getVideogames(name))
    }

    return (
        <div>
            <input type="text" placeholder="Search" onChange={(e) => {handleInputChange(e)}} />
                <button onClick={(e) => {handleClick(e)}}>Search</button>
        </div>
    )
}