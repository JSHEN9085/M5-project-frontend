export default function chatsReducer(state = {
  chats: [],
  activeChat: null
}, action) {
  switch(action.type) {

    case 'INITIAL_CHATS':
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
