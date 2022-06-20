import React from 'react'
import { Link } from 'react-router-dom'
import { VenueType } from '../types'

export function SingleVenueFromList(props: SingleVenueFromListProps) {
  const urlForShowingVenue = `/venue/${props.venue.id}`
  return (
    <li className="single-venue">
      <div className="name-music">
        {/* <i className="fa-solid fa-music music2"></i> */}
        {/* &nbsp;&nbsp; */}
        <h2>
          <Link to={urlForShowingVenue}>{props.venue.name}</Link>
        </h2>
      </div>
      <address>{props.venue.address}</address>
      <p className="number-reviews">{props.venue.reviews.length} Reviews</p>
    </li>
  )
}
type SingleVenueFromListProps = {
  venue: VenueType
}
