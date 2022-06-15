import React from 'react'
import { NewVenue } from './Pages/NewVenue'
import { SignUp } from './Pages/SignUp'
import { Venue } from './Pages/Venue'
import { VenueLanding } from './Pages/VenueLanding'
// import { Route, Routes } from 'react-router'

export function App() {
  return (
    <div>
      <header>
        <h1>Live Music - St Pete</h1>
        <nav>Home - SignUp - SignIn - Reviews</nav>
      </header>

      <VenueLanding />
      {/* <Routes>
        <Route path="/" element={<VenueLanding />} />
      </Routes> */}
      <footer>
        <p>This is footer</p>
      </footer>
    </div>
  )
}
