import React from 'react';

const Message = (props) => {
  return (
    <div className="messages-area">
      <h2>Messages Area</h2>
      <ul>{orderedMessages(props.messages)}</ul>
    </div>
  );
};

export default Message;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    return <li key={message.id}>{message.content}</li>;
  });
};
