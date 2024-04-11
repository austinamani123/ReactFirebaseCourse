import React from'react'
import { Auth } from './components/auth'
import { db } from './config/firebase'
import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'

function App() {

    const [movieList, setMovieList] = useState([])

    const moviesCollectionRef = collection(db, 'movies')

    useEffect(() => {
        const getMovieList = async () => {
            try{
                const data = await getDocs(moviesCollectionRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(), 
                    id: doc.id,
                }))
                console.log(filteredData)
                setMovieList(filteredData)
            } catch (err){
                console.log(err)
            }
        }

        getMovieList()
    },[])
    

    return(
        <div className="App">
            <Auth />

            <div>
                
            </div>


            <div>
                {movieList.map((movie) => (
                  <div>
                    <h1 style={{color: movie.receivedAnOscar ? 'green' : 'red'}}> {movie.title} </h1>
                    <p> {movie.releaseDate} </p>
                  </div>  
                ))}
            </div>
        </div>
    )
}

export default App