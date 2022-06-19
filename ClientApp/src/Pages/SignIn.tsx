import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { recordAuthentication } from '../auth'
import { APIError, LoginSuccess, LoginUserType } from '../types'

async function loginUser(user: LoginUserType): Promise<LoginSuccess> {
  const response = await fetch('/api/Sessions', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(user),
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

export function SignIn() {
  const [errorMessage, setErrorMessage] = useState('')

  const [user, setUser] = useState<LoginUserType>({
    email: '',
    password: '',
  })

  const loginUserMutation = useMutation(loginUser, {
    onSuccess: function (apiResponse) {
      // TODO: record the authentication information we receive

      recordAuthentication(apiResponse)
      window.location.assign('/')
    },
    onError: function (error: APIError) {
      setErrorMessage(Object.values(error.errors).join(' '))
    },
  })

  function handleStringFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...user, [fieldName]: value }

    setUser(updatedUser)
  }
  return (
    <>
      <form
        onSubmit={function (event) {
          event.preventDefault()
          loginUserMutation.mutate(user)
        }}
      >
        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

        <div className="allinputssignin">
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="e.g. alexsmith@gmail.com"
                onChange={handleStringFieldChange}
                value={user.email}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="password"
                value={user.password}
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
