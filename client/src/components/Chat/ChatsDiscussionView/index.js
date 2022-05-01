import React, { useEffect, useState } from 'react'

import './index.css'


export default function ChatsDiscussionView({ chatData, onChatClick }) {

  if (!chatData) {
    return 'Error in loading chat data...'
  }

  const getUserData = (userId) => {
    return chatData.users.find((userObj) => userObj.id === userId)
  }

  const getLastChatFromSender = (chatMessages) => {
    // you'll hev to complete
  }

  const getTrimmedText = (text, length = 25) => {
    return text.substring(0, length) + '...'
  }

  const openChats = (chatId) => {
    console.log('clicked openChats::ChatId = ', chatId)
    onChatClick(chatId)
  }

  const renderChatsDiscussions = () => {
    const { chats } = chatData

    function chatsMapCb(chatObj) {
      const userData = getUserData(chatObj.userId)
      const lastChatPeek = chatObj.messages[chatObj.messages.length - 1]

      return (
        <div className='chat-row' key={chatObj.userId} onClick={openChats.bind(null, chatObj.id)}>
          <div className='col col-1 user-avatar'>
            <img src={userData.thumbnail} alt="" />
            <span className='user-online-dot'></span>
          </div>
          <div className='col col-2 user-chat-data'>
            <div>
              <p className='user-title'>{userData.username}</p>
              <p className='last-text-peek'>{getTrimmedText(lastChatPeek.text)}</p>
            </div>
          </div>
          <div className='col col-3 chat-timestamp'>
            <span className='lastchat-timestamp'>{chatObj.lastTalkedAt}</span>
          </div>
        </div>
      )
    }

    const renderedChatsView = chats.map(chatsMapCb)

    return renderedChatsView
  }

  return (
    <div className='chat-discussions'>
      {renderChatsDiscussions()}
    </div>
  )
}
