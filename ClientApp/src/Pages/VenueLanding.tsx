import React from 'react'
import { useQuery } from 'react-query'

import map from '../images/map.png'
import { CSSStarsProperties, VenueType } from '../types'
import { SingleVenueFromList } from '../components/SingleVenueFromList'

export function VenueLanding() {
  const { data: venues = [] } = useQuery<VenueType[]>(
    'venues',
    async function () {
      const response = await fetch('/api/venues')
      return response.json()
    }
  )

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
          {venues.map(function (venue) {
            return <SingleVenueFromList key={venue.id} venue={venue} />
          })}
        </ul>
      </main>
    </>
  )
}
