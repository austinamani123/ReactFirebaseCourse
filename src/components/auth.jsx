import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
export const Auth = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    console.log(auth?.currentUser?.email)

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        }catch (err){
            console.log(err)
        }    
    }

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider)
        }catch (err){
            console.log(err)
        }    
    }

    const logOut = async () => {
        try{
            await signOut(auth)
        }catch (err){
            console.log(err)
        }    
    }



    return (
        <div className="m-8">
            <label>Email</label>
            <input 
                className="border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 border-2 rounded-md p-2 m-2"
                placeholder='Email...' 
                onChange={(e)=> setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
                className="border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 border-2 rounded-md p-2 m-2"
                type='password'
                placeholder='Password...'
                onChange={(e)=> setPassword(e.target.value)}
            />
            <button 
                onClick={signIn} 
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl w-32 border-2 border-blue-600 hover:border-blue-500 font-bold"
            >Sign In</button>

            <button onClick={signInWithGoogle}
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl w-48 border-2 border-blue-600 hover:border-blue-500 font-bold ml-2"
            >Sign In With Google</button>

            <button onClick={logOut}
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl w-32 border-2 border-blue-600 hover:border-blue-500 font-bold ml-2"
            >Log Out</button>
        </div>
    )

}