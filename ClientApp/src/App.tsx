import React from 'react'

import { VenueLanding } from './Pages/VenueLanding'

export function App() {
  return (
    <div>
      <header>
        <h1>Live Music - St Pete</h1>
      </header>
      <nav>Home - SignUp - SignIn - Reviews</nav>
      <VenueLanding />

      <footer>
        <p>This is footer</p>
      </footer>
    </div>
  )
}
