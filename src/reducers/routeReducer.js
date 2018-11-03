export default function routerReducer(state = {
  currentUser: {},
  chats: [],
  activeChat: null,
}, action) {
  switch(action.type) {

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

    default:
      return state;
  }
}
