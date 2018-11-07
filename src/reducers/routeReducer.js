export default function routerReducer(state = {
  currentUser: null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: false,
  chats: [],
  activeChat: null,
}, action) {
  switch(action.type) {

    case 'SET_CURRENT_USER':
      return {...state, currentUser: action.payload, loggedIn: true, authenticatingUser: false}

    case 'AUTHENTICATING_USER':
      return { ...state, authenticatingUser: true }

    case 'AUTHENTICATED_USER':
      return { ...state, authenticatingUser: false }

    case 'INITIAL_STATE':
      return {...state, chats: [...state.chats].concat(action.chats)}

    case 'ADD_CHAT':
      return {...state,
        chats: [action.chat].concat([...state.chats])
      }

    case 'SELECT_CHAT':
      return {...state,
        activeChat: action.chat
      }

    case 'ADD_MESSAGE':
      return {...state,
        activeChat: action.chat
      }

    default:
      return state;
  }
}
