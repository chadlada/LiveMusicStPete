import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ReviewType, VenueType } from '../types'
import format from 'date-fns/format'
import { isLoggedIn } from '../auth'

async function loadOneVenue(id: string) {
  const response = await fetch(`/api/venues/${id}`)

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

async function submitNewReview(review: ReviewType) {
  const response = await fetch(`/api/Reviews`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(review),
  })

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
  const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`

  const { id } = useParams<{ id: string }>()

  const { refetch: reloadRestaurant, data: venue = NullVenue } =
    useQuery<VenueType>(['one-venue', id], () => loadOneVenue(id))

  const createNewReview = useMutation(submitNewReview, {
    onSuccess: function () {
      reloadRestaurant()
      setNewReview({
        ...newReview,
        body: '',
        summary: '',
      })
    },
  })

  const [newReview, setNewReview] = useState<ReviewType>({
    body: '',
    summary: '',
    venueId: Number(id),
  })

  function handleNewReviewTextFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = event.target.name
    const value = event.target.value

    setNewReview({ ...newReview, [name]: value })
  }
  return (
    <>
      <div className="allinputs">
        <h2 className="h2-venue">{venue.name}</h2>
        <p className="p-venue-address">{venue.address}</p>
        <p className="p-review-count"> Reviews:{venue.reviews.length}</p>

        <ul className="reviews">
          {venue.reviews.map((review) => (
            <li key={review.id}>
              <div className="author">
                <br />
                <p>
                  Joe Said:<em> {review.summary}</em>
                </p>
              </div>
              <div className="review-body">
                <p>{review.body}</p>
              </div>
              <time>
                {review.createdAt
                  ? format(new Date(review.createdAt), dateFormat)
                  : null}
              </time>{' '}
            </li>
          ))}
        </ul>

        {isLoggedIn() ? (
          <form
            onSubmit={function (event) {
              {
                event.preventDefault()
                createNewReview.mutate(newReview)
              }
            }}
          >
            <div className="border-venue"></div>
            <div className="field">
              <label className="label">Summary</label>
              <div className="control">
                <input
                  name="summary"
                  type="text"
                  value={newReview.summary}
                  onChange={handleNewReviewTextFieldChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Review</label>
              <div className="control">
                <input
                  name="body"
                  type="text"
                  value={newReview.body}
                  onChange={handleNewReviewTextFieldChange}
                />
              </div>
            </div>
            <button className="button is-primary is-rounded">Submit</button>
          </form>
        ) : null}
      </div>
    </>
  )
}
