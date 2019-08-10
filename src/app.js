import React from 'react'
import './app.scss'

const App = props => {
  console.log(process.env.NODE_ENV)
  return (
    <div>
      <main className="flex">
        <h1>hello</h1>
        <h1>world</h1>
      </main>
    </div>
  )
}

export default App