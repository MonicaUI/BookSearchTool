import React, { useState } from 'react'
// import Modal from './Modal'


export default function TrendingBooks({
    title,
    author,
    cover,
}) {
    return (
        <div>
            <div className="slider" >
                <div className='slide-track'>
                    <div className="slide">
                        {cover !== "" ? (
                            <img
                                className="trending__image"
                                src={cover}
                                alt={title}
                            />
                        ) :
                            <div className="snippet__title">
                                <p className="snippet__book-title">{title}</p>
                                <p className="snippet__book-author">{author}</p>
                            </div>}
                    </div>
                </div>
            </div>

        </div>
    )
}