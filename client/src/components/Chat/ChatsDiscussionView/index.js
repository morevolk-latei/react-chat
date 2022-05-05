import React, { useEffect, useState } from 'react'

import './index.css'


export default function ChatsDiscussionView({
  chatData = null,
  users = null,
  onChatClick,
  getUserDataWithId,
  isChatsLoading
}) {

  if (isChatsLoading) {
    return <h1>'Loading chat data please wait...'</h1>
  }

  if (!chatData) {
    return <h1>Something went wrong. Unable to fetch chats</h1>
  }

  const getLastChatFromSender = (chatMessages) => {
    // you'll hev to complete
  }

  const getUserThumbnail = (userData) => {
    function getAvatar() {
      const username = userData.username.split(' ')
      return username[0][0].toUpperCase() + username[1][0].toUpperCase()
    }

    let thumbnail = userData.thumbnail
    if (userData.thumbnail === 'initials') {
      thumbnail = getAvatar(userData)
      return <div className="user-avatar">{thumbnail}</div>
    }

    return <div className="avatar-img" style={{ backgroundImage: `url(${thumbnail})` }}></div>
  }

  const getTrimmedText = (text, length = 25) => {
    return text.substring(0, length) + '...'
  }

  const openChats = (chatId, targetUserId) => {
    console.log('clicked openChats::ChatId = ', chatId)
    onChatClick(chatId, targetUserId)
  }

  const renderChatsDiscussions = () => {

    function chatsMapCb(chatObj) {
      const userData = getUserDataWithId(chatObj.userId)
      const lastChatPeek = chatObj.messages[chatObj.messages.length - 1] || null

      return (
        <div className='chat-row' key={chatObj.userId} onClick={openChats.bind(null, chatObj.id, userData.id)}>
          <div className='col col-1 user-avatar-col'>
            {getUserThumbnail(userData)}
            <span className='user-online-dot'></span>
          </div>
          <div className='col col-2 user-chat-data'>
            <div>
              <p className='user-title'>{userData.username}</p>
              {lastChatPeek && <p className='last-text-peek'>{getTrimmedText(lastChatPeek.text)}</p>}

            </div>
          </div>
          <div className='col col-3 chat-timestamp'>
            <span className='lastchat-timestamp'>{chatObj.lastTalkedAt}</span>
          </div>
        </div>
      )
    }

    const renderedChatsView = chatData.map(chatsMapCb)

    return renderedChatsView
  }

  return (
    <div className='chat-discussions'>
      {renderChatsDiscussions()}
    </div>
  )
}
