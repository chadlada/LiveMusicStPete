import React, { useState } from 'react'
import { useQuery } from 'react-query'

import map from '../images/mapstpete.png'
import { VenueType } from '../types'
import { SingleVenueFromList } from '../components/SingleVenueFromList'

export function VenueLanding() {
  const [filterText, setFilterText] = useState('')

  const { data: venues = [] } = useQuery<VenueType[]>(
    ['venues', filterText],
    async function () {
      // let url = '/api/venues'

      // if (filterText.length !== 0) {
      //   url = `/api/venues?filter=${filterText}`
      // }
      const url =
        filterText.length === 0
          ? 'api/venues'
          : `api/venues?filter=${filterText}`

      const response = await fetch(url)
      return response.json()
    }
  )

  return (
    <>
      <br />
      <p className="landing">
        Find local live music venues in the Sunshine City!
      </p>
      <main className="allinputs">
        <form className="search">
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={function (event) {
              setFilterText(event.target.value)
            }}
          />
        </form>
        <br />

        <section className="map">
          <img
            className="mapmap"
            alt="Example Map"
            src={map}
            width="250"
            height="200"
          />
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
