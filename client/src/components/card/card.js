import React from 'react'
import './card.css'


export default function Card ({name, image, genre, genres}) {
    console.log(genre)
    console.log(genres)
    return (
        <div className='card'>
            <h5 className='title'>{name}</h5>
            <img className='image' src={image} alt='img not found'/>
            <div className='ctn-genres'>
                {genre ? genre.map((e) => (
                    <h6 className='genres'>{`${e} `} </h6>
                    ))
                :
                genres.map((e) => (
                    <h6 className='genres'>{`${e.name} `} </h6>
                    ))
                }
            </div>
        </div>
    )
}