import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { NewReviewType, VenueType } from '../types'
import format from 'date-fns/format'
import { authHeader, getUserId, isLoggedIn } from '../auth'


export function Venue() {
  // const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const NullVenue: VenueType = {
    id: undefined,
    userId: 0,
    name: '',
    address: '',
    description: '',
    telephone: '',
    photoURL: '',
    reviews: [],
  }

  const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`

  const { refetch: reloadVenue, data: venue = NullVenue } = useQuery<VenueType>(
    ['one-venue', id],
    () => loadOneVenue(id)
  )

  const createNewReview = useMutation(submitNewReview, {
    onSuccess: function () {
      reloadVenue()
      setNewReview({
        ...newReview,
        body: '',
        summary: '',
      })
    },
  })

  const [newReview, setNewReview] = useState<NewReviewType>({
    id: undefined,
    body: '',
    summary: '',
    createdAt: new Date(),
    venueId: Number(id),
  })

  async function loadOneVenue(id: string | undefined) {
    const response = await fetch(`/api/venues/${id}`)

    if (response.ok) {
      return response.json()
    } else {
      throw await response.json()
    }
  }

  async function submitNewReview(review: NewReviewType) {
    const response = await fetch(`/api/Reviews`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: authHeader(),
      },
      body: JSON.stringify(review),
    })

    if (response.ok) {
      return response.json()
    } else {
      throw await response.json()
    }
  }

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
<p>
        {venue.photoURL ? (
          <img alt="Venue Photo" width={200} src={venue.photoURL} />
        ) : null}
</p>
<p>
        {venue.userId === getUserId() ?  <button>Delete</button> : null}
</p>
        <ul className="reviews">
          {venue.reviews.map((review) => (
            <li key={review.id}>
              <div className="author">
                <br />
                <p>
                  {review.user.fullName} Said:<em> {review.summary}</em>
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
