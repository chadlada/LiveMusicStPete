import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import { APIError, NewUserType } from '../types'

async function submitNewUser(newUser: NewUserType) {
  const response = await fetch('/api/Users', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newUser),
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

export function SignUp() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const [newUser, setNewUser] = useState<NewUserType>({
    fullName: '',
    email: '',
    password: '',
  })

  const createUserMutation = useMutation(
    (newUser: NewUserType) => submitNewUser(newUser),
    {
      onSuccess: function () {
        navigate('/')
      },
      onError: function (error: APIError) {
        setErrorMessage(Object.values(error.errors).join('. '))
      },
    }
  )

  function handleStringFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...newUser, [fieldName]: value }

    setNewUser(updatedUser)
  }
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          createUserMutation.mutate(newUser)
        }}
      >
        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
        <div className="allinputssignup">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                name="fullName"
                type="text"
                placeholder="e.g Alex Smith"
                value={newUser.fullName}
                onChange={handleStringFieldChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                name="email"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
                value={newUser.email}
                onChange={handleStringFieldChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                name="password"
                type="password"
                placeholder="password"
                value={newUser.password}
                onChange={handleStringFieldChange}
              />
            </div>
          </div>
          <button className="button is-primary is-rounded">Submit</button>
        </div>
      </form>
    </>
  )
}
