import React from'react'
import { Auth } from './components/auth'
import { db, auth, storage } from './config/firebase'
import { useState, useEffect } from 'react'
import { getDocs, addDoc, deleteDoc, updateDoc, doc, collection } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import Movie from './components/movie'


function App() {

    //New Movie States
    const [newMovieTitle, setNewMovieTitle] = useState('')
    const [newReleaseDate, setNewReleaseDate] = useState(0)
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

    const [movieList, setMovieList] = useState([])

    //Update Title State
    const [updatedTitle, setUpdatedTitle] = useState('')

    //File Upload State
    const [fileUpload, setFileUpload] = useState(null)

    //Collection Reference
    const moviesCollectionRef = collection(db, 'movies')

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
    
    useEffect(() => {
        getMovieList()
    },[])
    
    const onSubmitMovie = async () => {
      try {
          await addDoc(moviesCollectionRef, {
              title: newMovieTitle, 
              releaseDate: newReleaseDate,
              receivedAnOscar: isNewMovieOscar,
              userId: auth?.currentUser?.uid,
          })
    
          getMovieList()
      } catch (err) {
          console.log(err)
      }
    
    }
    
    const deleteMovie = async (id) => {
        const movieDoc = doc(db, 'movies', id)
        await deleteDoc(movieDoc)
    
        getMovieList()
    }
    
    const updateMovieTitle = async (id) => {
        const movieDoc = doc(db, 'movies', id)
        await updateDoc(movieDoc, {title: updatedTitle})
    
        getMovieList()
    }

    const uploadFile = async () => {
        if(!fileUpload) return;
        const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
        try{
        await uploadBytes(filesFolderRef, fileUpload)
        } catch (err) {
            console.log(err)
        }
    }

    

    return(
        <div className="ml-8 mr-4">
            <Auth />

            <div className="m-8">
               <label>Title</label> 
               <input 
                    className="border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 border-2 rounded-md p-2 m-2"
                    placeholder='Movie title...'
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                /> 
                <label>Release Date</label>
               <input 
                    className="border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 border-2 rounded-md p-2 m-2"
                    placeholder='Release date...' 
                    type='number' 
                    onChange={(e) => setNewReleaseDate(Number(e.target.value))}
                />
               <input
                    className="w-12"
                    type="checkbox" 
                    checked={isNewMovieOscar} 
                    onChange={(e) => setIsNewMovieOscar(e.target.checked)}/> 
               <label>Receieved an Oscar</label>
               <button 
                    onClick={onSubmitMovie} 
                    className='bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-2xl w-36 border-2 border-blue-600 hover:border-blue-500 font-bold ml-12'>
                    Submit Movie
                </button>
            </div>

            <div className="flex flex-col justify-center">
                {movieList.map((movie) => (
                  
                   <Movie 
                        deleteMovie={deleteMovie} 
                        updatedTitle={updatedTitle}
                        setUpdatedTitle={setUpdatedTitle}
                        updateMovieTitle={updateMovieTitle}
                        movie={movie}
                    />
                  
                ))}
            </div>
           
            <div>
                      <input 
                          type="file" 
                          onChange={(e) => setFileUpload(e.target.files[0]) }
                          className="border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 border-2 rounded-md p-2 m-2"
                      />
                      <button 
                          onClick={uploadFile}
                          className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl w-44 border-2 border-blue-600 hover:border-blue-500 font-bold"
                          >Upload File</button>
                </div>

        </div>
    )
}

export default App