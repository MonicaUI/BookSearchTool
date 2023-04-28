import React from 'react'
import './SearchBar.css'

export default function SearchBar(props) {
    return (
        <div className="searchbar">
            <input
                type="text"
                id="search-input"
                className="searchbar__input"
                placeholder="Book Title"
                onChange={(e) => props.onChange(e.target.value)}
            />
            <button
                id="search-button"
                className="searchbar__button"
                onClick={() =>
                    props.onChange(
                        document.getElementById('search-input').value
                    )
                }
            >
                Search
            </button>
        </div>
    )
}