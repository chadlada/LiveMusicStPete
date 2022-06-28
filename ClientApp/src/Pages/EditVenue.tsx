import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import { authHeader } from '../auth'
import { APIError, UploadResponse, VenueType } from '../types'
import { useDropzone } from 'react-dropzone'

  async function loadOneVenue(id: string | undefined) {
    const response = await fetch(`/api/venues/${id}`)

    if (response.ok) {
      return response.json()
    } else {
      throw await response.json()
    }
  }



export function EditVenue() {
  const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()


        useQuery<VenueType>(['one-venue', id], () => loadOneVenue(id),
        {
          onSuccess: function(venueBeingLoaded){
            setUpdatingVenue(venueBeingLoaded)
          },
        }

        )

  const [isUploading, setIsUploading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

  const [updatingVenue, setUpdatingVenue] = useState<VenueType>({
    id: undefined,
    userId: 0,
    name: '',
    description: '',
    address: '',
    telephone: '',
    photoURL: '',
    reviews: [],
  })

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: onDropFile,
    })

        function handleStringFieldChange(
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) {
          const value = event.target.value
          const fieldName = event.target.name

          const updatedVenue = { ...updatingVenue, [fieldName]: value }

          setUpdatingVenue(updatedVenue)
        }

     async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
       event.preventDefault()
       updateTheVenue.mutate(updatingVenue)
     }

  

       

  const updateTheVenue = useMutation(submitEditedVenue, {
    onSuccess: function () {
      // This happens if we successfuly update venue
      navigate('/')
    },
    onError: function (apiError: APIError) {
      const newMessage = Object.values(apiError.errors).join(' ')
      setErrorMessage(newMessage)
    },
  })


async function submitEditedVenue(venueToUpdate: VenueType) {
  const response = await fetch(`/api/Venues/${venueToUpdate.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify(venueToUpdate),
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}


  async function uploadFile(fileToUpload: File) {
    // Create a formData object so we can send this
    // to the API that is expecting some form data.
    const formData = new FormData()

    // Append a field that is the form upload itself
    formData.append('file', fileToUpload)

    // Use fetch to send an authorization header and
    // a body containing the form data with the file
    const response = await fetch('/api/Uploads', {
      method: 'POST',
      headers: {
        Authorization: authHeader(),
      },
      body: formData,
    })

    if (response.ok) {
      return response.json()
    } else {
      throw 'Unable to upload image!'
    }
  }

 function onDropFile(acceptedFiles: File[]) {
  // Do something with the files
  const fileToUpload = acceptedFiles[0]
  console.log(fileToUpload)
  uploadFileMutation.mutate(fileToUpload)
  setIsUploading(true)
}



  const uploadFileMutation = useMutation(uploadFile, {
    onSuccess: function (apiResponse: UploadResponse) {
      const url = apiResponse.url

      setUpdatingVenue({ ...updatingVenue, photoURL: url })
    },

    onError: function (error: string) {
      setErrorMessage(error)
    },

    onSettled: function () {
      setIsUploading(false)
    },
  })

  let dropZoneMessage = 'Drag a picture of the venue here to upload!'

  if (isUploading) {
    dropZoneMessage = 'Uploading...'
  }

  if (isDragActive) {
    dropZoneMessage = 'Drop the files here ...'
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
                value={updatingVenue.name}
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
                value={updatingVenue.description}
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
                value={updatingVenue.address}
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
                value={updatingVenue.telephone}
                onChange={handleStringFieldChange}
              />
            </div>
          </div>
          <p className="uploadpic">
            {updatingVenue.photoURL && (
              <p>
                <img
                  alt="venue Photo"
                  width={200}
                  src={updatingVenue.photoURL}
                />
              </p>
            )}

            <div className="file-drop-zone">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {dropZoneMessage}
              </div>
            </div>
          </p>
          <br />
          <button className="button is-primary is-rounded">Submit</button>
        </div>
      </form>
    </>
  )
}
