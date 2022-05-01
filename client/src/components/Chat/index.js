import React, { useEffect, useState } from 'react';
import { primaryNavigations } from '../../utils/configs';
import Header from '../reusable/Header';
import SideNav from '../reusable/SideNav';
import ChatsDiscussionView from './ChatsDiscussionView';

import './index.css';

// ESM - ES Modules

function Chat(props) {
  console.log('chat props ', props)

  const [chatData, setChatData] = useState(null)
  const [chatToViewData, setChatToViewData] = useState(null)

  const fetchChatData = async () => {
    const res = await fetch('http://localhost:9090/chat-discussions')
    const { data, status } = await res.json()

    console.log({ data, status })

    if (status === 200)
      setChatData(data)
  }

  useEffect(() => {
    fetchChatData()
  }, [])

  const handleChatClick = (chatId) => {
    const chatToViewData = chatData.chats.filter((chatObj) => chatObj.id === chatId)
    setChatToViewData(chatToViewData[0])
  }

  return (
    <div className="Chat-App">
      <Header navigations={primaryNavigations} />

      <div className='App-Body'>
        <div className='chat-wrapper'>
          <div className='chat-container'>
            {/* 1st column */}
            <div className='col col-1 main-navigation'>
              <SideNav {...props} />
            </div>
            {/* 2nd column */}
            <div className='col col-2 users-listing'>
              <ChatsDiscussionView {...props} chatData={chatData} onChatClick={handleChatClick} />
            </div>
            {/* 3rd column */}
            <div className='col col-3 chat-room'>
              {
                chatToViewData ?
                  chatToViewData.messages.map(
                    (chat, index) => <li key={index}>{chat.text}</li>
                  )
                  : null
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Chat;
