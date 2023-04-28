import React, { useState } from 'react'
import './AllBooks.scss'
import Modal from './Modal'

function AllBooks({
    title,
    author,
    firstPublished,
    publisher,
    isbn,
    cover
}) {
    const [modalActive, setModalActive] = useState(false)

    return (
        <div>
            <div className="snippet" onClick={() => setModalActive(true)}>
                <div className="snippet__cover">
                    <img
                        className="snippet__image"
                        src={cover}
                        alt="no cover available"
                    />
                    <div className="snippet__coverImage"></div>
                </div>
                <div className="allBook__title">
                    <h3 className="snippet__book-title">{title}</h3>
                    <p className="snippet__book-author">{author}</p>
                    <p className="snippet__book-date">First published in {firstPublished}</p>
                </div>

            </div>
            <Modal
                active={modalActive}
                setActive={setModalActive}
                title={title}
                author={author}
                firstPublished={firstPublished}
                publisher={publisher}
                isbn={isbn}
                cover={cover}
            />
        </div>
    )
}

export default AllBooks