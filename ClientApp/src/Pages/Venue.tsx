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
  reviews: [],
}

export function Venue() {
  const { id } = useParams<{ id: string }>()

  const { data: venue = NullVenue } = useQuery<VenueType>(
    ['one-venue', id],
    () => loadOneVenue(id)
  )

  return (
    <>
      <div className="allinputs">
        <h2 className="h2-venue">{venue.name}</h2>
        <p>{venue.address}</p>
        Reviews:{venue.reviews.length}
        <ul className="reviews">
          {venue.reviews.map((review) => (
            <li key={review.id}>
              <div className="author">
                <p>
                  Joe Said:<em> {review.summary}</em>
                </p>
              </div>
              <div className="review-body">
                <p>{review.body}</p>
              </div>
              <time>{review.createdAt}</time>
            </li>
          ))}
        </ul>
        {/* <ul>
          <li>
            <div className="author">
              <p>
                Joe Said:<em> Phenomenal!</em>
              </p>
            </div>
            <div className="review-body">
              <p>This place was jammin all night long!!!</p>
            </div>
            <time>Friday, June 14th, 2022 at 2:00 PM</time>
          </li>
          <li>
            <div className="author">
              <p>
                Joe Said:<em>Amazing!</em>
              </p>
            </div>
            <div className="review-body">
              <p>Never been anywhere better. Blown away!</p>
            </div>
            <time>Tuesday, June 8th, 2022 at 2:00 PM</time>
          </li>
        </ul> */}
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
