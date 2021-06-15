import React from 'react'

export default function Card (name, image) {
    return (
        <div>
            <h5>{name}</h5>
            <img src={image} alt='img not found' width='200px' height='200px' />
        </div>
    )
}