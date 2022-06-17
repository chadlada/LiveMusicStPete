import React from 'react'
import { Link } from 'react-router-dom'
import { VenueType } from '../types'

export function SingleVenueFromList(props: SingleVenueFromListProps) {
  const urlForShowingVenue = `/venue/${props.venue.id}`
  return (
    <li>
      <h2>
        <Link to={urlForShowingVenue}>{props.venue.name}</Link>
      </h2>
      <address>{props.venue.address}</address>
      <p>{props.venue.reviews.length} Reviews</p>
    </li>
  )
}
type SingleVenueFromListProps = {
  venue: VenueType
}
