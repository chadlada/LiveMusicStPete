import React from 'react'
import { NewVenue } from './Pages/NewVenue'
import { SignIn } from './Pages/SignIn'
import { SignUp } from './Pages/SignUp'
import { Venue } from './Pages/Venue'
import { VenueLanding } from './Pages/VenueLanding'
import git from './images/GitHub-Mark.png'
import linkedin from './images/linkedin.png'
// import { Route, Routes } from 'react-router'

export function App() {
  return (
    <div>
      <header>
        <h1>Live Music - St Pete</h1>
        <nav>Home - SignUp - SignIn - Reviews</nav>
      </header>
      <br />

      <VenueLanding />
      {/* <Routes>
        <Route path="/" element={<VenueLanding />} />
      </Routes> */}
      <footer>
        <div className="footer">
          <span className="link">
            <a href="https://www.linkedin.com/in/chad-lada-a01036105/">
              <img
                src={linkedin}
                className="linkimage"
                alt="linkedin"
                width="50"
                height="50"
              />
            </a>
          </span>
          <h2>Created by Chad Lada</h2>
          <span className="git">
            <a href="https://github.com/chadlada">
              <img
                src={git}
                className="gitimage"
                alt="github"
                width="50"
                height="50"
              />
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}
