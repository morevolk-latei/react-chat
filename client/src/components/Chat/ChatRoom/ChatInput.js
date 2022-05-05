import React, { useState } from 'react';

const ChatInput = ({ socket, loggedInUserData, chatUserData }) => {
  const [value, setValue] = useState('');

  const submitForm = (e) => {
    e.preventDefault();

    if (!value) return;

    socket.emit('SEND_MESSAGE', {
      to: chatUserData.id,
      from: loggedInUserData.id,
      message: value
    });

    setValue('');
  };

  return (
    <form onSubmit={submitForm} className='send-msg-form'>
      <input
        autoFocus
        value={value}
        placeholder="Type your message her"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        type='text'
      />

      <button type='submit'>
        <i className='icon send fa fa-paper-plane-o clickable' />
      </button>
    </form>
  );
};

export default ChatInput;
