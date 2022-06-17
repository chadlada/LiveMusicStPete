import React from 'react'
import { NewVenue } from './Pages/NewVenue'
import { Venue } from './Pages/Venue'
import { VenueLanding } from './Pages/VenueLanding'
import { SignUp } from './Pages/SignUp'
import { SignIn } from './Pages/SignIn'
import git from './images/GitHub-Mark.png'
import linkedin from './images/linkedin.png'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import { config } from '@fortawesome/fontawesome-svg-core'
console.log(config.autoA11y) // true

export function App() {
  return (
    <div>
      <header>
        <div className="nav-top">
          <Link to="/">
            <i className="fa-solid fa-house"></i>
          </Link>
          <h1>Live Music - St Pete</h1>
        </div>

        <nav>
          <br />
          <Link to="/signup">SignUp</Link>-<Link to="/signin"> SignIn </Link>-
          <Link to="new">Add Venue</Link>
        </nav>
        <i>Welcome Back, Steve!</i>
      </header>
      <br />

      <Routes>
        <Route path="/" element={<VenueLanding />} />
        <Route path="/new" element={<NewVenue />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/venue/:id" element={<Venue />} />
      </Routes>
      <footer>
        {/* <div className="footer"> */}
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
            <i className="fa-brands fa-github"></i>
            {/* <img
              src={git}
              className="gitimage"
              alt="github"
              width="50"
              height="50"
            /> */}
          </a>
        </span>
        {/* </div> */}
      </footer>
    </div>
  )
}
