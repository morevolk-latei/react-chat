module.exports = {
  users: [ // 500 users data
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
  ],
  chats: [
    {
      id: 'xyz123',
      userId: 18,
      isOnline: true,
      messages: [
        {
          createdAt: '123',
          isOwner: true,
          text: 'Hi Dave'
        },
        {
          createdAt: '123',
          isOwner: false,
          text: 'Hey!'
        },
        {
          createdAt: '123',
          isOwner: true,
          text: 'Yes, Hey! I\'m good. you tell'
        },
        {
          createdAt: '123',
          isOwner: true,
          text: 'hey? knock knock!! we can talk later if you\'re busy'
        }
      ],
      lastTalkedAt: '12 sec'
    },
    {
      id: 'xyz1245',
      userId: 12,
      messages: [
        {
          createdAt: '123',
          isOwner: true,
          text: 'Hi Megan'
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
      lastTalkedAt: '5 sec'
    },
    {
      id: 'xy12',
      userId: 19,
      messages: [
        {
          createdAt: '123',
          isOwner: true,
          text: 'Hi Elsie'
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
      lastTalkedAt: '5 min'
    },
    {
      id: 'yz334',
      userId: 101,
      messages: [
        {
          createdAt: '123',
          isOwner: true,
          text: 'Hi jerome'
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
      lastTalkedAt: '50 sec'
    },
    {
      id: 'rtz231',
      userId: 501,
      messages: [
        {
          createdAt: '123',
          isOwner: true,
          text: 'Hi Thomas'
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
      lastTalkedAt: '2 days'
    }
  ]
}
