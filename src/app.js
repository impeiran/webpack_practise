import React from 'react'
import _ from 'lodash'
import './app.scss'

const App = props => {
  let test = {}
  if (_.isEmpty(test)) {
    console.log('666')
  }

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