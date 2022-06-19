import React from 'react'
import { NewVenue } from './Pages/NewVenue'
import { Venue } from './Pages/Venue'
import { VenueLanding } from './Pages/VenueLanding'
import { SignUp } from './Pages/SignUp'
import { SignIn } from './Pages/SignIn'
import linkedin from './images/linkedin.png'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
// import { config } from '@fortawesome/fontawesome-svg-core'
import { getUser, isLoggedIn, logout } from './auth'

export function App() {
  function handleLogout() {
    logout()

    window.location.assign('/')
  }

  return (
    <div>
      <header>
        <div className="nav-top">
          <Link to="/">
            <i className="fa-solid fa-house"></i>
          </Link>
          <h1 className="h1-landing">Live Music - St Pete</h1>
          {isLoggedIn() ? (
            <a
              href="/"
              className="link"
              onClick={function (event) {
                event.preventDefault()
                handleLogout()
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </a>
          ) : null}
        </div>

        <nav>{isLoggedIn() ? <LoggedInNav /> : <LoggedOutNav />}</nav>
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

// ------------------------------------------------Functions------------------------------------------------

function LoggedInNav() {
  const user = getUser()

  return (
    <>
      <Link to="/new">
        <i className="fa-solid fa-plus"></i>
        <span className="add-venue-text">Venue</span>
      </Link>

      <br />
      <p className="welcome-back">Welcome Back, {user.fullName}!</p>
    </>
  )
}

function LoggedOutNav() {
  return (
    <>
      <Link to="/signup">SignUp</Link>
      <Link to="/signin"> SignIn </Link>
    </>
  )
}
