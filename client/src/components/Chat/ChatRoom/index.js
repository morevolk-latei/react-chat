import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";

import './index.css'

export default function ChatRoom({
  chatData,
  chatUserData,
  loggedInUserData,
  socket
}) {
  console.log("CHATROOM::props = ", chatData, chatUserData)

  // write the comment here, explaining the logic of this function, 
  const getUserThumbnail = (isOwner, thumbnailUrl) => {
    function getAvatar(userData) {
      const username = userData.username.split(' ')
      return username[0][0].toUpperCase() + username[1][0].toUpperCase()
    }

    let thumbnail = ''
    if (thumbnailUrl === 'initials') {
      if (isOwner) {
        thumbnail = getAvatar(loggedInUserData)
      } else {
        thumbnail = getAvatar(chatUserData)
      }

      return thumbnail
    } else {
      thumbnail = thumbnailUrl
    }

    return <div className="avatar-img" style={{ backgroundImage: `url(${thumbnailUrl})` }}></div>
  }

  const renderChats = () => {
    const { messages = [] } = chatData

    return messages.map((msgObj, index) => {
      let messageTypeClass = 'owner'
      if (!msgObj.isOwner) {
        messageTypeClass = 'not-owner'
      }

      let userThumbnail = getUserThumbnail(msgObj.isOwner, msgObj.isOwner ? loggedInUserData.thumbnail : chatUserData.thumbnail)

      return (
        <div className={`message-row ${messageTypeClass}`} key={msgObj.text + index}>
          <div className="user-avatar">
            {userThumbnail}
          </div>
          <p className='message'>{msgObj.text}</p>
        </div>
      )
    })
  }

  const addAfterBaseClass = (suffix) => `chat-room-${suffix}`

  return (
    <div className={addAfterBaseClass('container')}>
      <header className={addAfterBaseClass('header')}>
        <div className='recepient-name'>
          <i className='icon fa fa-user-o' />
          <p className='name'>{chatUserData.username}</p>
        </div>
        <div className='option-dots'>
          <i className="icon clickable fa fa-ellipsis-h right" />
        </div>
      </header>

      <div className={addAfterBaseClass('body')}>
        {renderChats()}
      </div>

      <footer className={addAfterBaseClass('footer')}>
        <div className='emojis-box'>
          <i className='icon fa fa-smile-o clickable' />
        </div>
        <ChatInput socket={socket} loggedInUserData={loggedInUserData} chatUserData={chatUserData} />
      </footer>
    </div>
  )
}
