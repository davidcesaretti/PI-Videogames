import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { createGame } from '../../actions/index'

const handleSubmit = (e) => {
    e.preventDefault()

}

const handleChange = (e) => {
    e.preventDefault()
}

export default function Form () {
    return (
        <div>
            <h1>Form</h1>
            <form onSubmit={(e) => {handleSubmit(e)} }>
                <input
                    type='text'
                    placeholder='Name'
                    onChange={(e) => {handleChange()}}
                />
                <input
                    type='text'
                    placeholder='Description'
                    onChange={(e) => {handleChange()}}
                />
                <input
                    type='text'
                    placeholder='Release Date'
                    onChange={(e) => {handleChange()}}
                />
                <input
                    type='text'
                    placeholder='Rating'
                    onChange={(e) => {handleChange()}}
                />
                <input
                    type='submit'
                />
            </form>
        </div>
    )
}