import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { VenueType } from '../types'

async function loadOneVenue(id: string) {
  const response = await fetch(`/api/venues/${id}`)

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

const NullVenue: VenueType = {
  id: undefined,
  name: '',
  address: '',
  description: '',
  telephone: '',
}

export function Venue() {
  const { id } = useParams<{ id: string }>()

  const { data: venue = NullVenue } = useQuery<VenueType>(
    ['one-venue', id],
    () => loadOneVenue(id)
  )

  return (
    <>
      <div className="allinputsvenue">
        <h2>{venue.name}</h2>
        <p>{venue.address}</p>
        <h3>
          Reviews: <p>Joe said so good!</p>
        </h3>
        <div className="field">
          <label className="label">Summary</label>
          <div className="control">
            <input className="input" type="text" />
          </div>
        </div>
        <div className="field">
          <label className="label">Review</label>
          <div className="control">
            <input className="input" type="text" />
          </div>
        </div>
        <button className="button is-primary is-rounded">Submit</button>
      </div>
    </>
  )
}
