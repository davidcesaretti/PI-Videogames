import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css'

export default function LandingPage () {
    return (
        <div>
            <img className='landing' src='https://i2.wp.com/wallpaperaccess.com/full/346792.jpg' alt='landing' />
            <Link to='/videogames' className='button'>Home</Link>
        </div>
    )
}