import React from 'react'
import { NewVenue } from './Pages/NewVenue'
// import { SignIn } from './Pages/SignIn'
// import { SignUp } from './Pages/SignUp'
// import { Venue } from './Pages/Venue'
import { VenueLanding } from './Pages/VenueLanding'
import git from './images/GitHub-Mark.png'
import linkedin from './images/linkedin.png'
import { Route, Routes } from 'react-router'
import { SignUp } from './Pages/SignUp'
import { SignIn } from './Pages/SignIn'
import { Link } from 'react-router-dom'

export function App() {
  return (
    <div>
      <header>
        <h1>Live Music - St Pete</h1>
        <nav>
          <Link to="/">Home</Link> - <Link to="/signup">SignUp</Link> -{' '}
          <Link to="/signin"> SignIn </Link> - <Link to="new">Add Venue</Link>
        </nav>
        <i>Welcome Back, Steve!</i>
      </header>
      <br />

      <Routes>
        <Route path="/" element={<VenueLanding />} />
        <Route path="/new" element={<NewVenue />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
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
