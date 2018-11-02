import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Chat = (props) => {
  return (
    <Fragment>
      {props.chats.map(chat => {
        return (
          <ActionCable
            key={chat.id}
            channel={{ channel: 'MessagesChannel', chat: chat.id }}
            onReceived={props.handleReceivedMessage}
          />
        );
      })}
    </Fragment>
  );
};

export default Chat;
