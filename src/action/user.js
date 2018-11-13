import {API_ROOT, HEADERS} from '../constants/index'

export const loginUser = (email, password) => {
  return (dispatch) => {

    dispatch(authenticatingUser())
    fetch(`${API_ROOT}/login`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        user: {
        email: email,
        password: password
        }
      })
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    }).then(JSONResponse => {
      localStorage.setItem('jwt', JSONResponse.jwt)
      dispatch(setCurrentUser(JSONResponse.user))
    })
    .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))
  }
}

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  return (dispatch) => {
    dispatch(authenticatingUser()) //tells the app we are fetching
    fetch(`${API_ROOT}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then((JSONResponse) => {
        dispatch(setCurrentUser(JSONResponse.user))
      }
    )
  }
}

export const setCurrentUser = (userData) => ({
  type: 'SET_CURRENT_USER',
  payload: userData
})

export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })
