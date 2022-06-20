import React, { useState } from 'react'
import { useQuery } from 'react-query'

import musiccc from '../images/findlivemusic.png'
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

      <main className="allinputs">
        <p className="landing">
          Find local live music venues in the Sunshine City!
        </p>
        <form className="search">
          <input
            className="search-search"
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={function (event) {
              setFilterText(event.target.value)
            }}
          />
        </form>
        <br />

        <img
          className="music-image"
          alt="musician"
          src={musiccc}
          width="288"
          height="200"
        />

        <ul className="results">
          {venues.map(function (venue) {
            return <SingleVenueFromList key={venue.id} venue={venue} />
          })}
        </ul>
      </main>
    </>
  )
}
