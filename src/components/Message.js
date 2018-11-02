import React from 'react';
import NewMessageForm from './NewMessageForm';

const Message = (  {chat: { id, topic, messages }  }) => {
  return (
    <div className="messagesArea">
      <h2>{topic}</h2>
      <ul>{orderedMessages(messages)}</ul>
      <NewMessageForm conversation_id={id} />
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
