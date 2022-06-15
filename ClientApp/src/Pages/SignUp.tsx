import React from 'react'

export function SignUp() {
  return (
    <>
      <div className="allinputs">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" type="text" placeholder="e.g Alex Smith" />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="text" placeholder="password" />
          </div>
        </div>
        <button className="button is-primary is-rounded">Submit</button>
      </div>
    </>
  )
}
