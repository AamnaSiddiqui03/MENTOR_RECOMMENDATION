import React from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
 
 export default function TextApp() {
    const [text] = useTypewriter({
        words: [' MENTOR', ' GUIDE', ' GURU'], //' ಮಾರ್ಗದರ್ಶಕ'
        loop: {},
        onLoopDone: () => console.log(`loop completed after 3 runs.`)
      })
    
      return (
        <div className='App'>
            <span className='adjustsize-text text-medblue'>FIND YOUR</span> 
          <span>{text}</span>
          <Cursor cursorColor='red' />
          <div> 
          </div>
            
        </div>
      )
 }


























 