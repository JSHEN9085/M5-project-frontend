export default function chatsReducer(state = {
  initialChats: [],
  chats: [],
  activeChat: null,
  ifFiltered: false
}, action) {
  switch(action.type) {

    case 'INITIAL_CHATS':
      return {...state,
        initialChats: action.chats,
        chats: action.chats
      }

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

    case 'FILTER_CHATS':
      return {...state,
        chats: action.chats
      }

    case 'SWITCH_FILTER':
      return {...state,
        ifFiltered: !state.ifFiltered
      }

    case 'EXIT_ROOM':
      return {...state,
        activeChat: null
      }

      break;

    default:
      return state;
  }
}
