import React from 'react'
import style from './card.module.css'


export default function Card ({name, image, genre, genres}) {
    return (
        <div className={style.card}>
            <h5 className={style.title}>{name}</h5>
            <img className={style.image} src={image} alt='img not found'/>
            <div className={style.ctnGenresCard}>
                {genre ? genre.map((e) => (
                    <h6 className={style.genres}>{`${e} `} </h6>
                    ))
                :
                genres.map((e) => (
                    <h6 className={style.genres}>{`${e.name} `} </h6>
                    ))
                }
            </div>
        </div>
    )
}