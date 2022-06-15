import React from 'react'
import { VenueType } from '../types'

export function SingleVenueFromList(props: SingleVenueFromListProps) {
  return (
    <li>
      <h2>{props.venue.name}</h2>
      <address>{props.venue.address}</address>
    </li>
  )
}
type SingleVenueFromListProps = {
  venue: VenueType
}
