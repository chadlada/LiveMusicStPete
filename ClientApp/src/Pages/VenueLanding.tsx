import React from 'react'
import { CSSStarsProperties } from '../types'
import map from '../images/map.png'

export function VenueLanding() {
  return (
    <>
      <br />
      <p className="landing">
        Find local live music venues in the Sunshine City!
      </p>
      <main className="home-content">
        <form className="search">
          <input type="text" placeholder="Search..." />
        </form>
        <br />

        <section className="map">
          <img alt="Example Map" src={map} width="250" height="200" />
        </section>

        <ul className="results">
          <li>
            <h2>Ruby&apos;s Elixir</h2>
            <address>8005 Benjamin Rd, Tampa, FL 33634</address>
          </li>
          <li>
            <h2>Hideaway Cafe</h2>
            <address>5537 Sheldon Rd, Tampa, FL 33615</address>
          </li>
        </ul>
      </main>
    </>
  )
}
