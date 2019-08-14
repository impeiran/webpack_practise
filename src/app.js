import React from 'react'
import { log } from './test'
import './app.scss'

const App = props => {
  log('666')
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
