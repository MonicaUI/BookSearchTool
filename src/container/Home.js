import SearchBar from '../components/SearchBar'
import AllBooks from '../components/AllBooks'
import TrendingBooks from '../components/TrendingBooks'
import { useState, useEffect } from 'react'
import LoadingSpinner from '../components/spinner'
import './Home.css'

function Home() {
    // Search Input Value
    const [search, setSearch] = useState('')
    const [searchBooks, setSearchBooks] = useState([])
    const [trendingBooks, setTrendingBooks] = useState([])
    const [isLoading, setLoading] = useState(true)


    // Pagination
    const [visible, setVisible] = useState(10)
    const loadMoreBooks = () => {
        setVisible((prevValue) => prevValue + 5)
    }
    // Pagination button
    const loadMoreButton = document.getElementById('load-more-button')

    // fetch
    const apiUrl = `https://openlibrary.org/search.json?q=${search}`
    const initAPI = `https://openlibrary.org/trending/now.json`

    useEffect(() => {

        let controller = new AbortController()

        async function fetchApi() {
            try {
                const initResponse = await fetch(initAPI, {
                    signal: controller.signal,
                })
                const dataAPI = await initResponse.json()
                setTrendingBooks(dataAPI.works)
                // if (initResponse.status === 200) {
                //     setLoading(true)
                // }
                const response = await fetch(apiUrl, {
                    signal: controller.signal,
                })
                if (response.status === 200) {
                    setLoading(false)
                }
                const data = await response.json()
                setSearchBooks(data.docs)

            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('fetch cancel: caught abort')
                } else {
                    throw error
                }
            }
        }

        fetchApi()
        if (loadMoreButton) {
            loadMoreButton.style.display = 'block'
        }

        return () => {
            controller.abort()
        }
    }, [search])

    const handleTitle = () => {
        const sortTitle = searchBooks;
        sortTitle.sort(function (a, b) {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0;
        })
        setSearchBooks(sortTitle)
        setVisible((prevValue) => prevValue + 5)
    }

    const handleFirstPublish = () => {
        const sortPublish = searchBooks
        sortPublish.sort(function (a, b) {
            if (a.first_publish_year && b.first_publish_year) {
                return (new Date(b.first_publish_year).valueOf() - new Date(a.first_publish_year).valueOf());
            } else {
                return 0
            }
        })
        setSearchBooks(sortPublish)
        setVisible((prevValue) => prevValue + 5)
    }

    return (
        <div >
            <SearchBar
                onChange={(inputValue) => {
                    setSearch(inputValue)
                    setLoading(true)
                }}
            />
            <div className="Home-book">
                <p> Welcome to Open Library </p>
                {isLoading ?
                    <LoadingSpinner /> : ''}
                <div className="trending">
                    {searchBooks.length === 0 && trendingBooks.length > 0 ? <p className='trending-now'> Trending Books </p> : null}
                    {searchBooks.length === 0 && trendingBooks.length > 0 ? (trendingBooks.slice(0, visible).map((book) => {
                        return (
                            <TrendingBooks
                                key={book.key}
                                title={book.title ? book.title : 'unknown'}
                                author={
                                    book.author_name ? book.author_name[0] : 'unknown'
                                }
                                firstPublished={
                                    book.first_publish_year
                                        ? book.first_publish_year
                                        : 'unknown'
                                }
                                publisher={
                                    book.publisher ? book.publisher[0] : 'unknown'
                                }
                                isbn={book.isbn ? book.isbn[0] : 'unknown'}
                                cover={
                                    book.availability
                                        ? 'http://covers.openlibrary.org/b/isbn/' +
                                        parseInt(book.availability.isbn) +
                                        '-M.jpg'
                                        : ''
                                }
                            />
                        )
                    })) : ''}

                </div>
            </div>
            <div>
                {searchBooks.length > 0 ?
                    (<div className='sort-books'>
                        <p >Sorted by</p>
                        <button onClick={handleTitle}> Title</button>
                        <button onClick={handleFirstPublish}>First published</button>
                    </div>)
                    : null}


                {searchBooks.slice(0, visible).map((book) => {
                    return (
                        <AllBooks
                            key={book.key}
                            title={book.title ? book.title : 'unknown'}
                            author={
                                book.author_name ? book.author_name[0] : 'unknown'
                            }
                            firstPublished={
                                book.first_publish_year
                                    ? book.first_publish_year
                                    : 'unknown'
                            }
                            publisher={
                                book.publisher ? book.publisher[0] : 'unknown'
                            }
                            isbn={book.isbn ? book.isbn[0] : 'unknown'}
                            cover={
                                book.isbn
                                    ? 'http://covers.openlibrary.org/b/isbn/' +
                                    book.isbn[0] +
                                    '-M.jpg'
                                    : ''
                            }
                        />
                    )
                })}
            </div>
            {search !== "" ?
                (<button
                    className="load-more-button"
                    id="load-more-button"
                    onClick={loadMoreBooks}
                >
                    Load more books
                </button>) : null}
        </div>

    )
}

export default Home