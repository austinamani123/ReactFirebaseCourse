import React from 'react'

const Movie = ({deleteMovie, setUpdatedTitle, updateMovieTitle, movie}) => {
  return (
    <>
         <div className="m-8 ">
                <h1 className='text-xl' style={{color: movie.receivedAnOscar ? 'green' : 'red'}}> {movie.title} </h1>
                <p> {movie.releaseDate} </p>
                <button
                    onClick={() => deleteMovie(movie.id)}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl w-44 border-2 border-blue-600 hover:border-blue-500 font-bold"
                >Delete Movie</button>
                <input 
                    className="border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 border-2 rounded-md p-2 m-2"
                    placeholder='New title...' 
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <button
                    onClick={() => updateMovieTitle(movie.id)}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl w-44 border-2 border-blue-600 hover:border-blue-500 font-bold"
                >Update Title</button>        
         </div>  

         
    </>
  )
}

export default Movie