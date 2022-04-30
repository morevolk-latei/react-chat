export const appData = {
  chats: [ // 100 chats
    {
      userId: 18,
      isOnline: true,
      messages: [
        {
          createdAt: '123',
          isOwner: true,
          text: 'Hi'
        },
        {
          createdAt: '123',
          isOwner: false,
          text: 'Hey! how are you? long time!'
        },
        {
          createdAt: '123',
          isOwner: true,
          text: 'Yes, Hey! I\'m good. you tell'
        },
        {
          createdAt: '123',
          isOwner: true,
          text: 'hey? knock knock!! are you there? we can talk later if you\'re busy'
        }
      ],
      lastTalkedAt: '12 sec'
    },
    {
      userId: 12,
      messages: [],
      lastTalkedAt: '5 sec'
    },
    {
      userId: 19,
      messages: [],
      lastTalkedAt: '5 min'
    },
    {
      userId: 101,
      messages: [],
      lastTalkedAt: '50 sec'
    },
    {
      userId: 501,
      messages: [],
      lastTalkedAt: '2 days'
    }
  ]
}

export const users = [ // 500 users data
  {
    username: 'Megan Leib',
    thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    id: 12,
  },
  {
    username: 'Dave Corlew',
    thumbnail: 'https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
    id: 18
  },
  {
    username: 'Jerome Seiber',
    thumbnail: 'https://card.thomasdaubenton.com/img/photo.jpg',
    id: 101
  },
  {
    username: 'Thomas Dbtn',
    thumbnail: 'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
    id: 501
  },
  {
    username: 'Elsie Amador',
    thumbnail: 'https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg',
    id: 19
  }
]

/*
suppose you have chatted with 500 people and now those 500 users data is stored in users collection,
hence everytime you render the chats user data means you are iterating over 500 sets of user
data to get the target user information.

therefore if there are 100 chats you have with 100 diff users.
you'll iterate over chats collections to render the chats data and with every chat being rendered you'll
have to iterate over 500 sets of users collection in roder to just get the current user info.

complexity:  100 * 500 = 50,000 iterations you'll be doing just to render the chats users sections.
*/

// 100 * 1 iteration users collection = 100 items
// 100 * 500 = 50,000 performance bloat



// const profileData = {
//   connections: {
//     users: [123, 12312, 43534, 45645, 6567, 67867, 86, 978],
//     totalNoConnections: 8
//   },
//   thumbnailURL: 'image url',
//   username: 'Rizul Sharma',
//   profileDesc: 'some kind of profile desc',
//   actionBtns: {},
//   profileLink: '',
//   profileSettings: {},
//   reels: [],
//   highlights: [],
//   stories: [],
//   shareConfig: {}
// }
