import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import { APIError, VenueType } from '../types'

async function submitNewVenue(venueToCreate: VenueType) {
  const response = await fetch('/api/Venues', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(venueToCreate),
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

export function NewVenue() {
  const navigate = useNavigate()
  const [newVenue, setNewVenue] = useState<VenueType>({
    id: undefined,
    name: '',
    description: '',
    address: '',
    telephone: '',
    reviews: [],
  })

  const [errorMessage, setErrorMessage] = useState('')
  const createNewVenue = useMutation(submitNewVenue, {
    onSuccess: function () {
      // This happens if we successfuly update venue
      navigate('/')
    },
    onError: function (apiError: APIError) {
      const newMessage = Object.values(apiError.errors).join(' ')
      setErrorMessage(newMessage)
    },
  })

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    createNewVenue.mutate(newVenue)
  }

  function handleStringFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedVenue = { ...newVenue, [fieldName]: value }

    setNewVenue(updatedVenue)
  }
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
        <div className="allinputs">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                name="name"
                type="text"
                placeholder="e.g Venue Name Here.."
                value={newVenue.name}
                onChange={handleStringFieldChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                className="input"
                name="description"
                type="text"
                placeholder="Describe venue here!"
                value={newVenue.description}
                onChange={handleStringFieldChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Address</label>
            <div className="control">
              <input
                className="input"
                name="address"
                type="text"
                placeholder="Address"
                value={newVenue.address}
                onChange={handleStringFieldChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Telephone</label>
            <div className="control">
              <input
                className="input"
                name="telephone"
                type="text"
                placeholder="Telephone"
                value={newVenue.telephone}
                onChange={handleStringFieldChange}
              />
            </div>
          </div>
          <p className="uploadpic">
            <label htmlFor="picture">Picture</label>
            <input type="file" name="picture" />
          </p>
          <br />
          <button className="button is-primary is-rounded">Submit</button>
        </div>
      </form>
    </>
  )
}
