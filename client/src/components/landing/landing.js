import React from 'react';
import { Link } from 'react-router-dom';
import style from './landing.module.css'

export default function LandingPage () {
    return (
        <div>
            <img className={style.landing} src='https://i.pinimg.com/originals/9f/1a/9b/9f1a9bdc444718b7e29ec5e17fa756d4.jpg' alt='landing' />
            <Link to='/videogames' className={style.button}>Press Start</Link>
        </div>
    )
}