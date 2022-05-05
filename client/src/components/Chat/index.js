import React, { useEffect, useState } from 'react';
import { primaryNavigations } from '../../utils/configs';
import Header from '../reusable/Header';
import SideNav from '../reusable/SideNav';
import ChatRoom from './ChatRoom';
import ChatsDiscussionView from './ChatsDiscussionView';
import io from 'socket.io-client';


import './index.css';

// ESM - ES Modules

function Chat(props) {
  console.log('chat props ', props)

  const getLoggedInUserIdFromQuery = () => {
    const { location: { search } } = props
    const queryObj = {}
    const queryParams = search.substring(1).split('&')

    queryParams.forEach(queryStr => {
      const [key, value] = queryStr.split('=')
      queryObj[key] = value
    })

    console.log('Query Search ', search, ':: parsed obj ', queryObj)

    return parseInt(queryObj.userPersonate)
  }

  const [chatData, setChatData] = useState(null)
  const [users, setUsers] = useState(null)
  const [chatToViewData, setChatToViewData] = useState(null)
  const [socket, setSocket] = useState(null);
  const [loggedInUserData, setLoggedInUser] = useState(null)
  const [isChatsLoading, setIsChatsLoading] = useState(true)


  useEffect(() => {
    if (socket) {
      // socket instance is available, now fetch the loggedIn user chat through socket

      socket.on('ALL_CHATS', (data) => {
        console.log('Received Chats ', data)
        setChatData(data)
        setIsChatsLoading(false)
      })

      socket.on('USER_ONLINE', (userId) => setUserOnline(userId))
      socket.on('NEW_MESSAGE', (newMsg) => handleNewChatMessage(newMsg))

      setIsChatsLoading(true)
      socket.emit('GET_ALL_CHATS', { ...loggedInUserData });
    }
  }, [socket])

  useEffect(() => {
    if (loggedInUserData) {
      console.log('loggedInUserData is availanle')
      const newSocket = io(`ws://localhost:9090`);
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        newSocket.close();
      }
    }
  }, [loggedInUserData]);


  useEffect(() => {
    if (users && users.length) {
      // now users are there, so fetching logged In user to display on screen and fetch that users chat

      const currentLoggedInUser = users.find(user => user.isLoggedIn)
      if (currentLoggedInUser) {
        setLoggedInUser(currentLoggedInUser)
      } else {
        alert('Error in setting loggedIn user')
      }
    }
  }, [users])

  useEffect(() => {
    async function login(userId) {
      try {
        const res = await fetch(`http://localhost:9090/login?personateUser=${userId}`)
        if (!res.ok) {
          throw Error(res.statusText)
        }

        const data = await res.json()
        console.log('res users personate ', data)
        if (data.status === 200) {
          setUsers(data.users)
        }
      }
      catch (e) {
        alert('Error in loggin. Please check the logs')
        console.error('LOGIN_ERROR:: ', e)
      }
    }

    const loggedInUserId = getLoggedInUserIdFromQuery() || {
      username: 'Rizul Sharma',
      thumbnail: 'initials',
      id: 1290,
    }

    login(loggedInUserId)
  }, [])

  const handleNewChatMessage = (newMsg) => {
    console.log('NEW_MESSAGE received :: ', newMsg, { chatToViewData })
    const targetUserId = chatToViewData.chatData.userId

    const updatedChats = [...chatData].map(userChat => {
      if (userChat.userId === targetUserId) {
        userChat.messages.push(newMsg)
      }

      return userChat
    })

    console.log('UPDATED CHATS ', updatedChats)

    setChatData(updatedChats)
  }

  const setUserOnline = (userId) => {
    console.log('USER_ONLINE:: ', userId, chatData)
    if (!chatData) return;

    const updatedChats = chatData.chats.map((chatObj) => {
      if (chatObj.userId === userId) {
        chatObj.isOnline = true
      }

      return chatObj
    })

    const newData = { ...chatData, chats: updatedChats }

    setChatData(newData)
  }

  // const fetchChatData = async () => {
  //   const res = await fetch('http://localhost:9090/chat-discussions')
  //   const { data, status } = await res.json()

  //   console.log({ data, status })

  //   if (status === 200)
  //     setChatData(data)
  // }

  // useEffect(() => {
  //   fetchChatData()
  // }, [])



  const getUserDataWithId = (userId) => {
    return users.find((userObj) => userObj.id === userId)
  }

  const handleChatClick = (chatId, targetUserId) => {
    const chatToViewData = {
      chatData: chatData.filter((chatObj) => chatObj.id === chatId)[0]
    }

    chatToViewData.chatUserData = getUserDataWithId(chatToViewData.chatData.userId)

    // emiting to socket to connect this user to targetUser
    socket.emit('JOIN', { currentUserId: loggedInUserData.id, requestedUserId: targetUserId })

    console.log('updating chat view ', chatToViewData)
    setChatToViewData(chatToViewData)
  }

  console.log('RENDER :: chatToViweData', chatToViewData)

  return (
    <div className="Chat-App">
      <Header navigations={primaryNavigations} />

      <div className='App-Body'>
        {loggedInUserData && <h2 className='loggedin-chip'>Loggedin user: {loggedInUserData.username}</h2>}
        <div className='chat-wrapper'>
          <div className='chat-container'>
            {/* 1st column */}
            <div className='col col-1 main-navigation'>
              <SideNav {...props} />
            </div>
            {/* 2nd column */}
            <div className='col col-2 users-listing'>
              <ChatsDiscussionView
                {...props}
                chatData={chatData}
                users={users}
                onChatClick={handleChatClick}
                getUserDataWithId={getUserDataWithId}
                isChatsLoading={isChatsLoading}
              />
            </div>
            {/* 3rd column */}
            <div className='col col-3 chat-room'>
              {
                chatToViewData ?
                  <ChatRoom
                    {...chatToViewData}
                    loggedInUserData={loggedInUserData}
                    socket={socket}
                  /> : null
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Chat;
