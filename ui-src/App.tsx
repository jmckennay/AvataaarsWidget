import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    fetch("https://avatars.dicebear.com/api/big-smile/hello.svg")
      .then(res => res.text())
      .then(result => {
        if (typeof parent !== undefined) {
          parent?.postMessage?.({ pluginMessage: result }, '*')
        }
      })
    
  }, [])

  return (
    <div className="App">
      <h1>Hello</h1>
      <button
        onClick={() => {
          parent?.postMessage?.({ pluginMessage: 'close' }, '*')
        }}
      >
        Close
      </button>
    </div>
  )
}

export default App