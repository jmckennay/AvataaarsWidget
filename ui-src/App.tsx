import React, { useEffect, useState } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    fetch(`https://avatars.dicebear.com/api/avataaars/:${Math.random()*100}.svg`)
      .then(res => res.text())
      .then(result => {
        if (typeof parent !== undefined) {
          parent?.postMessage?.({ pluginMessage: result }, '*')
        }
      })
    
  }, [])

  return (
    <div className="App">
      <h1>Loading</h1>
    </div>
  )
}

export default App