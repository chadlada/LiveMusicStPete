import React from 'react'

import { VenueLanding } from './Pages/VenueLanding'

export function App() {
  return (
    <div>
      <header>
        <h1>Live Music - St Pete</h1>
        <nav>Home - SignUp - SignIn - Reviews</nav>
      </header>

      <VenueLanding />

      <footer>
        <p>This is footer</p>
      </footer>
    </div>
  )
}
