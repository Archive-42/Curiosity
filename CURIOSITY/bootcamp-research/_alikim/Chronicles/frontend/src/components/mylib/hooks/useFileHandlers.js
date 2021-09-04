import { useCallback, useEffect, useReducer, useRef } from 'react'

const api = {
  uploadFile({ timeout = 550 }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, timeout)
    })
  },
}


// Constants
const LOADED = 'LOADED'
const INIT = 'INIT'
const UPLOAD_ERROR = 'UPLOAD_ERROR'

const initialState = {
  file: "",
  uploading: false,
  uploaded: {},
  status: 'idle',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'load':
      return { ...state, file: action.file, status: LOADED }
    case 'submit':
      return { ...state, uploading: true, status: INIT }
    case 'file-uploaded':
      return { ...state, uploaded: { ...state.uploaded } }
    case 'set-upload-error':
      return { ...state, uploadError: action.error, status: UPLOAD_ERROR }
    default:
      return state
  }
}

const useFileHandlers = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (state.file) {
      // setValue
      dispatch({ type: 'submit' })
    } else {
      window.alert("You don't have a file loaded.")
    }
  }, [state.file])

  const onChange = (e) => {
    if (e.target.files.length) {
      const arrFiles = Array.from(e.target.files)
      const file = {}
      file.file = file
      file.src = window.URL.createObjectURL(arrFiles[0])
      dispatch({ type: 'load', file })
    }
  }

  return { ...state, onSubmit, onChange }
}

export default useFileHandlers